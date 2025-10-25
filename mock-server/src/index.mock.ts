import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { PlayersMockServices } from "./services/players.mock.services";
import { QuestionsMockServices } from "./services/questions.mock.services";
import { LeaderboardMockServices } from "./services/leaderboard.mock.services";
import { initRedis } from "./redis";
import { configDotenv } from "dotenv";

// -------------------
// App Initialization
// -------------------
const app: Application = express();
configDotenv();

// Port configuration (fallback to 3000 if not set in .env)
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// -------------------
// Middleware
// -------------------
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.text());

// -------------------
// Endpoint
// -------------------

// Get Player
app.get('/api/player', async (_req: Request, res: Response): Promise<void> => {
  try {
    // get player
    const player = await PlayersMockServices.getPlayer("doularkos");

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
app.post('/api/player/create', async (req: Request, res: Response): Promise<void> => {
  try {
    const {countryCode} = req.body;

    // create player
    const player = await PlayersMockServices.createPlayer("doularkos", countryCode);

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
app.get('/api/gameplay/status', async (_req: Request, res: Response): Promise<void> => {
  try {
    // calculate
    const isGameover = await PlayersMockServices.isGameOver("doularkos", "postId");

    // return
    if (isGameover) res.json({status: 'success', data: {gameover: true}});
    else {
      const skipsRemaining = await PlayersMockServices.getRemainingSkips("doularkos", "postId");
      const currentQuestionId = await PlayersMockServices.getQuestionId("doularkos", "postId");

      // get question
      const question = await QuestionsMockServices.getQuestion(currentQuestionId);
      if (question) res.json({
        status: 'success',
        data: {gameover: false, skips: skipsRemaining, question: question}
      });
      else res.status(404).json({status: 'error', message: 'Error generating Question'});
    }
  } catch (error) {
    console.error('Error getting question:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get question',
    });
  }
});

// Submit Answer
app.post('/api/gameplay/answer', async (req: Request, res: Response): Promise<void> => {
  try {
    const {questionId, isCorrect} = req.body;

    // answer question
    const nextQuestion = await QuestionsMockServices.answerQuestion("doularkos", "postId", isCorrect, questionId);

    // return
    if (nextQuestion === null) res.json({status: 'success', data: {gameover: true}});
    else if (nextQuestion === undefined) res.status(404).json({
      status: 'error',
      message: 'Error generating Question'
    });
    else {
      await PlayersMockServices.setQuestion("doularkos", "postId", nextQuestion.id);
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
app.get('/api/gameplay/skip', async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log("SKIPPING");
    // get skips
    const remainingSkips = await PlayersMockServices.getRemainingSkips("doualrkos", "postId");

    // Add skip (this increments the skip count)
    await PlayersMockServices.addSkip("doularkos", "postId");

    // return
    const nextQuestion = await QuestionsMockServices.getQuestion(-1);
    if (nextQuestion) {
      await PlayersMockServices.setQuestion("doularkos", "postId", nextQuestion.id);
      res.json({
        status: 'success',
        data: {remainingSkips: remainingSkips, nextQuestion: nextQuestion}
      });
    } else res.status(404).json({status: 'error', message: 'Error generating Question'});
  } catch (error) {
    console.log("ERROR CAUGHT?");
    console.error('Error processing skip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process skip',
    });
  }
});

// Get Leaderboard
app.get('/api/leaderboard', async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({
      status: 'success',
      data: await LeaderboardMockServices.getLeaderboard("doularkos")
    });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get leaderboard',
    });
  }
});

// Get top 3 countries
app.get('/api/splash', async (_req, res): Promise<void> => {
  try {
    // return
    res.json({status: 'success', data: await LeaderboardMockServices.getTop3Countries()});
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get leaderboard',
    });
  }
});

// -------------------
// Start Server
// -------------------
const server = app.listen(PORT, async () => {
  await initRedis();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// -------------------
// Graceful Shutdown
// -------------------
process.on('SIGINT', () => {
  console.log('🛑 Server shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
