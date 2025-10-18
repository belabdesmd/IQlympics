import express from 'express';
import { createServer, getServerPort, reddit } from '@devvit/web/server';
import { UiResponse } from '@devvit/web/shared';
import { Response } from 'express';

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

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port, () => console.log(`http://localhost:${port}`));
