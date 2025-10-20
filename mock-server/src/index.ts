import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { PlayersServices } from "./services/players.services";
import { QuestionsServices } from "./services/questions.services";
import { PointsServices } from "./services/points.services";
import { LeaderboardServices } from "./services/leaderboard.services";
import { initRedis } from "./redis";

// -------------------
// App Initialization
// -------------------
const app: Application = express();

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
    const player = await PlayersServices.getPlayer("doularkos");
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
  const data = req.body;
  try {
    await PlayersServices.createPlayer("doularkos", data.countryCode);
    res.json({status: 'success', data: {username: "doularkos", countryCode: data.countryCode}});
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create player',
    });
  }
});

// Get Question
app.get('/api/gameplay/question', async (_req: Request, res: Response): Promise<void> => {
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
app.post('/api/gameplay/answer', async (req: Request, res: Response): Promise<void> => {
  const {correct} = req.body;

  try {
    const canContinue = await PointsServices.answerQuestion("doularkos", correct, "t_1234");
    res.json({
      status: 'success',
      data: canContinue
    });
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
    const currentSkips = await PlayersServices.getSkips("doularkos", "t_1234");

    // Check if player has skips remaining (starts with 3, decreases with each skip)
    if (currentSkips <= 0) {
      res.status(400).json({
        status: 'error',
        message: 'No skips remaining',
      });
      return;
    }

    // Add skip (this increments the skip count)
    await PlayersServices.addSkip("t_1234", "doularkos");

    res.json({
      status: 'success',
      data: QuestionsServices.getRandomQuestion()
    });
  } catch (error) {
    console.error('Error processing skip:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process skip',
    });
  }
});

// Get Game Status
app.get('/api/status', async (_req: Request, res: Response): Promise<void> => {
  try {
    const skipsRemaining = await PlayersServices.getSkips("doularkos", "t_1234");
    const wrongAnswers = await PlayersServices.getWrongs("doularkos", "t_1234");
    const isGameOver = wrongAnswers >= 5;

    res.json({
      status: 'success',
      data: {
        username: "doularkos",
        skips: skipsRemaining,
        gameover: isGameOver
      }
    });
  } catch (error) {
    console.error('Error getting game status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get game status',
    });
  }
});

// Get Leaderboard
app.get('/api/leaderboard', async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({
      status: 'success',
      data: await LeaderboardServices.getLeaderboard("doularkos")
    });
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
