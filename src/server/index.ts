import express from 'express';
import { context, createServer, getServerPort, reddit } from '@devvit/web/server';
import { UiResponse } from '@devvit/web/shared';
import { Response } from 'express';
import { PlayersServices } from "./core/players.services";
import { QuestionsServices } from "./core/questions.services";
import { LeaderboardServices } from "./core/leaderboard.services";
import { SettingsServices } from "./core/settings.services";

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({extended: true}));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// --------------------------------------------------------

// Menu: Create Post Form Init from Menu Click
router.post('/internal/menu/create-post', async (_req, res: Response<UiResponse>) => {
  try {
    res.json({
      showForm: {
        name: 'createPostForm',
        form: {
          title: 'Setup IQlympics Games Settings',
          description: 'Be one of IQlympics Game Organizers',
          cancelLabel: "Cancel",
          acceptLabel: "Start Now!",
          fields: [
            {
              name: 'hours',
              label: 'Hours',
              helpText: 'How many hours before the next Gameplay',
              type: 'number',
              required: true,
              defaultValue: 24,
            },
            {
              name: 'theme',
              label: 'Game Theme',
              helpText: 'What is the theme of the game?',
              type: 'string',
              required: false,
            }
          ],
        }
      },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.json({
      showToast: `Error creating post: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
});

// Form: Create Post Form
router.post('/internal/form/create-post', async (req, res: Response<UiResponse>) => {
  try {
    const {hours, theme} = req.body;
    const subreddit = await reddit.getCurrentSubreddit();

    // save subreddit theme
    if ((theme?.length ?? 0) > 0) await SettingsServices.setTheme(subreddit.id, theme);

    // reset subreddit details
    const logs = await SettingsServices.getLogs(subreddit.id);
    if (logs) {
      await SettingsServices.deletePost(logs.postId);
      await SettingsServices.cancelJob(logs.jobId);
    }

    // create post
    const postId = await SettingsServices.createPost(subreddit.name);

    // schedule next post
    const jobId = await SettingsServices.scheduleNextPost(hours, postId)!;

    // save logs
    await SettingsServices.setLogs(subreddit.name, postId, jobId);

  } catch (error) {
    console.error('Error creating post:', error);
    res.json({
      showToast: `Error creating post: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
});

// Job: Schedule Next Round
router.post('/internal/job/next-round', async (req, _res) => {
  const {hours, postId} = req.body.data;
  const subreddit = await reddit.getCurrentSubreddit();

  // delete post
  await SettingsServices.deletePost(postId);

  // create post
  const newPostId = await SettingsServices.createPost(subreddit.name);

  // schedule next post
  const jobId = await SettingsServices.scheduleNextPost(hours, newPostId)!;

  // save logs
  await SettingsServices.setLogs(subreddit.name, postId, jobId);
});

// Trigger: On Post Delete
router.post('/internal/trigger/post-delete', async (req, _res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      console.error('No post ID found in PostDelete event');
      return;
    }

    const logs = await SettingsServices.getLogs((await reddit.getCurrentSubreddit()).id);
    if (logs) await SettingsServices.cancelJob(logs.jobId); // post already deleted, just cancel jobId
    await PlayersServices.purgePostRelated(postId);
  } catch (error) {
    console.error('Error in postDelete trigger:', error);
  }
});

// --------------------------------------------------------

// Get Player
router.get('/api/player', async (_req, res): Promise<void> => {
  try {
    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(403).json({status: 'error', message: 'Username not found',});
      return;
    }

    // get player
    const player = await PlayersServices.getPlayer(username);

    // return
    if (!player) res.status(404).send("No such player");
    else res.json({status: 'success', data: player});
  } catch (error) {
    console.error('Error getting username:', error);
    res.status(500).json({status: 'error', message: 'Failed to get username',});
  }
});

// Create Player
router.post('/api/player/create', async (req, res): Promise<void> => {
  try {
    const {countryCode} = req.body;

    // username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(403).json({status: 'error', message: 'Username not found',});
      return;
    }

    // create player
    const player = await PlayersServices.createPlayer(username, countryCode);

    // return
    res.json({status: 'success', data: player});
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create player',
    });
  }
});

// Get Game Status
router.get('/api/gameplay/status', async (_req, res): Promise<void> => {
  try {
    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(403).json({status: 'error', message: 'Username not found',});
      return;
    }

    // get postId
    const {postId} = context;
    if (!postId) {
      res.status(400).json({status: 'error', message: 'Post is deleted',});
      return;
    }

    // calculate
    const isGameover = await PlayersServices.isGameOver(username, postId);

    // return
    if (isGameover) res.json({status: 'success', data: {gameover: true}});
    else {
      const skipsRemaining = await PlayersServices.getRemainingSkips(username, postId);
      const currentQuestionId = await PlayersServices.getQuestionId(username, postId);

      // get question
      const question = await QuestionsServices.getQuestion(currentQuestionId);
      if (question) res.json({
        status: 'success',
        data: {gameover: false, skips: skipsRemaining, question: question}
      });
      else res.status(404).json({status: 'error', message: 'Error generating Question'});
    }

    // return
  } catch (error) {
    console.error('Error getting game status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get game status',
    });
  }
});

// Submit Answer
router.post('/api/gameplay/answer', async (req, res): Promise<void> => {
  try {
    const {questionId, isCorrect} = req.body;

    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(403).json({status: 'error', message: 'Username not found',});
      return;
    }

    // get postId
    const {postId} = context;
    if (!postId) {
      res.status(400).json({status: 'error', message: 'Post is deleted',});
      return;
    }

    // answer question
    const nextQuestion = await QuestionsServices.answerQuestion(username, postId, isCorrect, questionId);

    // return
    if (nextQuestion === null) res.json({status: 'success', data: {gameover: true}});
    else if (nextQuestion === undefined) res.status(404).json({
      status: 'error',
      message: 'Error generating Question'
    });
    else {
      await PlayersServices.setQuestion(username, postId, nextQuestion.id);
      res.json({status: 'success', data: {gameover: false, nextQuestion: nextQuestion}});
    }
  } catch (error) {
    console.error('Error processing answer:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process answer',
    });
  }
});

// Skip Question
router.get('/api/gameplay/skip', async (_req, res): Promise<void> => {
  try {
    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(403).json({status: 'error', message: 'Username not found',});
      return;
    }

    // get postId
    const {postId} = context;
    if (!postId) {
      res.status(400).json({status: 'error', message: 'Post is deleted',});
      return;
    }

    // get skips
    const remainingSkips = await PlayersServices.getRemainingSkips(username, postId);

    // Add skip (this increments the skip count)
    await PlayersServices.addSkip(username, postId);

    // return
    const nextQuestion = await QuestionsServices.getQuestion(-1);
    if (nextQuestion) {
      await PlayersServices.setQuestion(username, postId, nextQuestion.id);
      res.json({
        status: 'success',
        data: {remainingSkips: remainingSkips, nextQuestion: nextQuestion}
      });
    } else res.status(404).json({status: 'error', message: 'Error generating Question'});
  } catch (error) {
    console.error('Error processing skip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process skip',
    });
  }
});

// Get Leaderboard
router.get('/api/leaderboard', async (_req, res): Promise<void> => {
  try {
    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(403).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // return
    res.json({status: 'success', data: await LeaderboardServices.getLeaderboard(username)});
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get leaderboard',
    });
  }
});

// Get top 3 countries
router.get('/api/splash', async (_req, res): Promise<void> => {
  try {
    // return
    res.json({status: 'success', data: await LeaderboardServices.getTop3Countries()});
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get leaderboard',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port, () => console.log(`http://localhost:${port}`));
