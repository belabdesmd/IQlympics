import express from 'express';
import { context, createServer, getServerPort, reddit, redis } from '@devvit/web/server';
import { UiResponse } from '@devvit/web/shared';
import { Response } from 'express';
import { PlayersServices } from "./core/players.services";
import { QuestionsServices } from "./core/questions.services";
import { PointsServices } from "./core/points.services";
import { LeaderboardServices } from "./core/leaderboard.services";

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
    // Submit post to Reddit
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitCustomPost({
      title: "Play IQlympics", //TODO: set proper post title
      subredditName: subreddit.name
    });

    res.json({navigateTo: post.url});
  } catch (error) {
    console.error('Error creating post:', error);
    res.json({
      showToast: `Error creating post: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
});


// Trigger: On Post Delete
router.post('/internal/trigger/post-delete', async (req, _res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      console.error('No post ID found in PostDelete event');
      return;
    }

    // TODO: purge post details

    console.log(`Successfully processed deletion of post ${postId}`);
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
      res.status(404).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // get player
    const player = await PlayersServices.getPlayer(redis, username);

    // return
    if (!player) res.status(404).send("No such player");
    else res.json({status: 'success', data: player});
  } catch (error) {
    console.error('Error getting username:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get username',
    });
  }
});

// Create Player
router.post('/api/player/create', async (req, res): Promise<void> => {
  try {
    const data = req.body;

    // username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(404).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // create player
    const player = await PlayersServices.createPlayer(redis, username, data.countryCode);

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

// Get Question
router.get('/api/gameplay/question', async (_req, res): Promise<void> => {
  try {
    const question = QuestionsServices.getRandomQuestion();
    res.json({status: 'success', data: question});
  } catch (error) {
    console.error('Error getting question:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get question',
    });
  }
});

// Submit Answer
router.post('/api/gameplay/answer', async (req, res): Promise<void> => {
  try {
    const {isCorrect} = req.body;

    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(404).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // get postId
    const {postId} = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'Post is deleted',
      });
      return;
    }

    // answer question
    const canContinue = await PointsServices.answerQuestion(redis, username, isCorrect, postId);

    // return
    res.json({status: 'success', data: canContinue});
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
      res.status(404).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // get postId
    const {postId} = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'Post is deleted',
      });
      return;
    }

    // get skips
    const currentSkips = await PlayersServices.getSkips(redis, username, postId);

    // Check if player has skips remaining (starts with 3, decreases with each skip)
    if (currentSkips <= 0) {
      res.status(400).json({
        status: 'error',
        message: 'No skips remaining',
      });
      return;
    }

    // Add skip (this increments the skip count)
    await PlayersServices.addSkip(redis, postId, username);

    // return
    res.json({status: 'success', data: QuestionsServices.getRandomQuestion()});
  } catch (error) {
    console.error('Error processing skip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process skip',
    });
  }
});

// Get Game Status
router.get('/api/status', async (_req, res): Promise<void> => {
  try {
    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(404).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // get postId
    const {postId} = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'Post is deleted',
      });
      return;
    }

    // calculate
    const skipsRemaining = await PlayersServices.getSkips(redis, username, postId);
    const wrongAnswers = await PlayersServices.getWrongs(redis, username, postId);
    const isGameOver = wrongAnswers >= 5;

    // return
    res.json({status: 'success', data: {username, skips: skipsRemaining, gameover: isGameOver}});
  } catch (error) {
    console.error('Error getting game status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get game status',
    });
  }
});

// Get Leaderboard
router.get('/api/leaderboard', async (_req, res): Promise<void> => {
  try {
    // get username
    const username = await reddit.getCurrentUsername();
    if (!username) {
      res.status(404).json({
        status: 'error',
        message: 'Username not found',
      });
      return;
    }

    // return
    res.json({status: 'success', data: await LeaderboardServices.getLeaderboard(redis, username)});
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
