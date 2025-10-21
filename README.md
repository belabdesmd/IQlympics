# 🌍 IQlympics - Global Knowledge Competition

**IQlympics** is an innovative competitive trivia experience where players represent their countries in a global battle of knowledge. Built for Reddit's Devvit platform, this game combines individual skill with national pride, creating a unique social gaming experience where every correct answer contributes to your country's global ranking.

## 🎮 What This Game Is

IQlympics is a **high-stakes trivia competition** where players select a nation to represent and answer challenging multiple-choice questions about geography, culture, history, and world knowledge. The game features a strategic skip system that allows players to avoid difficult questions, but with limited skips available. Players face elimination after making too many incorrect answers, creating tension and strategic decision-making in every question.

Every correct answer earns points for both the player and their chosen country, contributing to a live global leaderboard that ranks nations by their collective performance. This isn't just another trivia game - it's a **patriotic competition** where your performance directly impacts your country's standing on the global leaderboard, creating a sense of national representation and community contribution that's unique in the trivia space.

## 🚀 What Makes IQlympics Innovative

### 🌟 Revolutionary Features That Set It Apart

**1. Olympic-Style National Competition** 🏅
- Choose from a comprehensive database of 249 countries and territories with high-quality flag images from flagcdn.com
- Represent your nation in global intellectual competition where every answer matters
- Creates unprecedented sense of national pride in a trivia format with real country selection and radio button interface

**2. Collective Impact Scoring System** 📊
- Individual points contribute to your country's total ranking in real-time
- Personal contribution analytics show exactly what percentage you've added to your nation's success with visual progress bars
- Live global leaderboard displays top 5 countries with total accumulated points, position badges (gold/silver/bronze), and flag displays

**3. Strategic Skip System Gameplay** ⚡
- **Limited skip system** - players get a finite number of skips per session tracked in real-time (displayed as number next to skip button)
- **Strategic decision making** - choose wisely between answering and skipping to maximize your score and avoid elimination
- **5-mistake elimination** - players face game over after answering incorrectly 5 times in the current Reddit post
- **Icon-based interface** - clean circular white skip button (⏭️) with remaining skip count displayed prominently in top-left corner

**4. Reddit-Native Social Gaming** 🎮
- Built specifically for Reddit's Devvit platform with seamless integration using React.js and TypeScript
- Mobile-first responsive design optimized for Reddit's mobile-heavy user base with constrained layout (max-height: 500px)
- Elegant interface with smooth animations, vibrant animated gradient backgrounds, and card-based layouts with glass morphism effects
- Intelligent routing system (AppRouter + NavigationContext) that automatically detects player state and navigates to appropriate screens

**5. Real-Time Community Building** 🌐
- Watch your country climb the global rankings as you and fellow citizens contribute points
- Personal contribution tracking creates individual accountability within national success
- Combines personal achievement with collective national representation in a scrollable live leaderboard with fixed header

**6. Advanced Technical Implementation** 🛠️
- Modern React.js frontend with TypeScript for complete type safety and robust error handling
- Custom hooks (usePlayer, useGameplay, useLeaderboard) for sophisticated state management with retry logic
- Intelligent routing system with NavigationContext and AppRouter for automatic page transitions based on game state
- Comprehensive error handling with ErrorBoundary, retry mechanisms, loading states, and user-friendly feedback
- Skeleton loading screens (QuestionSkeleton, CountryListSkeleton, LeaderboardSkeleton), glass morphism UI effects, and smooth page transitions
- RESTful API architecture with Express.js backend and Redis data persistence

## 🎯 Core Game Mechanics

**The Challenge**: Answer multiple-choice trivia questions (4 options: A, B, C, D) correctly to earn points for yourself and your country. The game tracks your performance and eliminates players who make 5 incorrect answers in the current Reddit post.

**The Strategy**: You get a limited number of skips per game session (tracked in real-time and displayed next to the skip button). Use them wisely to avoid questions you're unsure about and preserve your chances for strategic gameplay.

**The Stakes**: Every correct answer adds points to both your personal score and your country's global ranking. Your individual contribution percentage is tracked and displayed with a visual progress bar showing your exact contribution to your nation's total points.

**The Competition**: Countries compete globally based on the collective points earned by all their players. Check the live leaderboard to see how your nation ranks against the world with position badges (gold/silver/bronze/blue), flag displays, and scrollable interface.

---

## 🎮 How to Play

### Step 1: Choose Your Country 🏳️
1. **Launch the game** from the Reddit post - the app automatically detects if you're a new player and routes to country selection with intelligent AppRouter navigation
2. **Search countries** using the real-time search bar with instant filtering (supports partial matching of country names via searchCountries utility)
3. **Browse the scrollable list** of 249 countries and territories with high-quality flag images (32x24px from flagcdn.com) and full country names in a 240px height container
4. **Select your nation** by clicking on any country in the list - it will be highlighted with blue background and radio button selection when selected
5. **Confirm selection** with the green "Pick Country" LoadingButton - you'll represent this country throughout all future games in this Reddit post

### Step 2: Answer Trivia Questions 🧠
1. **Read each question** carefully displayed on elegant white QuestionCard components with rounded corners and glass morphism effects (card-texture-subtle)
2. **Choose your answer** from 4 multiple-choice options (A, B, C, D) presented as interactive dark gray buttons with hover effects and smooth transitions
3. **Get instant feedback** - correct answers automatically load the next question with smooth page transitions and LoadingOverlay components
4. **Track your progress** - monitor your correct answers vs total questions in the centered progress counter below the question (green correct/total format with backdrop blur)
5. **Navigate easily** - access the leaderboard anytime via the circular white button with trophy SVG icon in the top-right corner

### Step 3: Strategic Skipping ⏭️
1. **Use skips wisely** - you have a limited number of skips per game session (tracked in GameStatus.skips and displayed in real-time in the top-left corner)
2. **Skip difficult questions** by clicking the circular white skip button with forward arrow SVG icon to avoid game-ending wrong answers
3. **Monitor remaining skips** - the skip counter shows how many you have left as a number next to the skip button with clean white circular design
4. **Plan strategically** - save skips for the hardest questions as the button becomes disabled and grayed out when you run out

### Step 4: Game Over Conditions ☠️
- **5-Mistake Limit**: Game ends when you make 5 incorrect answers in the current Reddit post with GameStatus.gameover = true triggering automatic navigation
- **Dramatic Display**: Game over page shows skull emoji (💀) and message: "You answered wrong 5 times in this post, you can't play anymore"
- **Strategic Gameplay**: Every question becomes a strategic decision between answering confidently or skipping safely to preserve your chances
- **Automatic Navigation**: useGameplay hook detects GameStatus.gameover and triggers onGameOver callback with smooth transitions
- **Post-Based Sessions**: Each Reddit post tracks your performance independently via Redis persistence - you can play again in different posts

### Step 5: Check the Leaderboard 🏆
1. **Access leaderboard** via the circular white button with trophy SVG icon during gameplay with NavigationContext routing and backdrop blur effects
2. **View global rankings** - see the top 5 countries with their flags (country-flag-image class), names, and total points in gradient-styled cards with position badges (1st gold, 2nd silver, 3rd bronze, others blue)
3. **Find your country** - see your nation's position and ranking with a special highlighted purple section showing your exact rank (#position) and flag display
4. **Track contribution** - view your personal percentage contribution to your country's total points with ProgressBar component and percentage display
5. **Return to gameplay** - use the circular back arrow button with smooth NavigationContext routing to continue playing and boost your country's standing

---

## 🏆 Scoring System

- **Correct Answer**: Points earned for you and your country (contributes to national total)
- **Wrong Answer**: Counts toward your mistake limit - game over after too many incorrect answers in the current Reddit post
- **Skipped Question**: No points gained, but game continues and doesn't count as a wrong answer (strategic survival option)
- **Country Ranking**: Based on cumulative points from all players representing that country
- **Personal Contribution**: Your points calculated as a percentage of your country's total score and displayed with a progress bar
- **Skip Management**: Limited skips per session - use strategically to avoid difficult questions and preserve your game

---

## 🛠 Technical Implementation

### Core Architecture
- **Platform**: Reddit Devvit Web Application with React.js frontend and Express.js backend
- **Frontend**: React.js with TypeScript, Tailwind CSS, custom hooks, and context providers
- **Backend**: Express.js server with Redis data persistence for player stats and game state
- **Build System**: Vite for both client and server builds with TypeScript project references
- **Entry Point**: main.tsx renders App component with ErrorBoundary, ToastProvider, and NavigationProvider

### API Architecture
- **RESTful Endpoints**: `/api/player`, `/api/player/create`, `/api/gameplay/question`, `/api/gameplay/answer`, `/api/gameplay/skip`, `/api/leaderboard`, `/api/status`
- **Type Safety**: Comprehensive TypeScript types (Player, Question, GameStatus, Leaderboard, Country) with ApiResponse wrappers
- **Error Handling**: RetryHandler with exponential backoff, ErrorHandler normalization, and user-friendly error messages
- **Loading States**: Skeleton screens and loading overlays for all major operations with LoadingCard component

### Frontend Features
- **Smart Navigation**: NavigationContext with AppRouter for automatic page transitions based on player existence and game state detection
- **Component Library**: Modular React components (QuestionCard, CountryListItem, ProgressBar, LoadingButton, SkeletonLoader, Toast system)
- **State Management**: Custom hooks (usePlayer, useGameplay, useLeaderboard) with comprehensive data management and retry logic
- **Responsive Design**: Mobile-first approach with constrained layout (max-height: 500px) optimized for Reddit's webview
- **Visual Design**: Tailwind CSS with custom game-specific utility classes, vibrant animated gradient backgrounds (backgrounds.css), and glass morphism effects
- **Error Handling**: Comprehensive ErrorBoundary with retry mechanisms and user-friendly error messages

### Data & Content
- **Country Database**: Complete dataset of 249 countries and territories with ISO 3166-1 alpha-2 codes and high-quality flag images (32x24px from flagcdn.com)
- **Search Functionality**: Real-time country search with instant filtering and partial matching via searchCountries utility function
- **Progress Tracking**: Live counters for correct answers, total questions, and remaining skips with visual feedback and ProgressBar components

---

## 🎯 Game Strategy Tips

1. **Master the Skip System**: Save your limited skips for genuinely difficult questions to preserve your chances
2. **Contribute Consistently**: Regular gameplay sessions increase your country's ranking
3. **Risk vs. Reward**: Sometimes skipping is better than risking a wrong answer that counts toward your mistake limit
4. **Monitor Leaderboards**: Check your country's progress and your contribution percentage
5. **Play Regularly**: Consistent participation helps maintain your country's global position
6. **Learn from Mistakes**: Use incorrect answers as learning opportunities while managing your mistake allowance
7. **Choose Wisely**: Take time to read each question carefully before committing to an answer

---

## 🌐 Global Competition

The game creates a unique dynamic where individual performance contributes to collective national success. Players develop a sense of responsibility to their country while enjoying personal achievement. The leaderboard system encourages both individual skill development and national pride, making every game session meaningful beyond personal entertainment.

## 🎯 Game Flow & Navigation

The game uses intelligent routing with AppRouter and NavigationContext that automatically determines the appropriate page based on player state:

1. **Initial Load**: App checks if player exists via usePlayer hook with LoadingCard display during player fetch
2. **New Players**: Automatically routed to CountrySelectionPage if no player found (404 response from /api/player)
3. **Existing Players**: Routed to GameplayPage to continue playing if player exists with automatic question fetching
4. **Smart Navigation**: NavigationContext manages page transitions ('country-selection', 'gameplay', 'leaderboard', 'game-over', 'error') with comprehensive error handling
5. **Automatic Routing**: Game over conditions (GameStatus.gameover = true) trigger automatic navigation to GameOverPage via useEffect in GameplayPage
6. **Error Recovery**: ErrorBoundary catches errors and provides retry mechanisms with user-friendly messages and reload functionality

## 🎮 Current Implementation Status

### ✅ Fully Implemented Features
- **5 Complete Pages**: CountrySelectionPage, GameplayPage, LeaderboardPage, GameOverPage, and ErrorPage with full functionality and smooth transitions
- **Smart Navigation**: Automatic routing with NavigationContext and AppRouter components that detect player state and handle page transitions intelligently
- **Rich UI Components**: QuestionCard, CountryListItem, ProgressBar, LoadingButton, QuestionSkeleton, CountryListSkeleton, LeaderboardSkeleton with hover effects and smooth animations
- **Custom React Hooks**: usePlayer, useGameplay, useLeaderboard for comprehensive state management with RetryHandler logic and ErrorHandler normalization
- **Complete API Integration**: All endpoints (/api/player, /api/player/create, /api/gameplay/question, /api/gameplay/answer, /api/gameplay/skip, /api/leaderboard, /api/status) with proper error handling, loading states, and retry mechanisms
- **Comprehensive Country Database**: Complete dataset of 249 countries and territories with ISO 3166-1 alpha-2 codes, high-quality flag images (32x24px from flagcdn.com), and real-time search functionality via searchCountries utility
- **Strategic Gameplay**: Limited skip system with tactical decision-making, 5-mistake elimination system (GameStatus.gameover) with skull emoji display, and progress tracking
- **Responsive Design**: Mobile-first approach optimized for Reddit webview (max-height: 500px) with glass morphism effects (card-texture-subtle) and vibrant animated gradient backgrounds (backgrounds.css)
- **Progress Tracking**: Live counters for correct answers, total questions, and remaining skips (GameStatus.skips) with visual feedback and backdrop blur effects
- **Contribution System**: Personal percentage calculation of country's total points with ProgressBar visualization and detailed analytics (Leaderboard.contribution)
- **Error Boundary**: Comprehensive error handling with ErrorBoundary component, retry mechanisms, and user-friendly error messages
- **Toast Notifications**: Real-time feedback system for user actions and API responses with ToastProvider integration
- **Loading States**: Skeleton screens for all major components (QuestionSkeleton, CountryListSkeleton, LeaderboardSkeleton) with LoadingCard for initialization
- **Type Safety**: Complete TypeScript implementation with shared types (Player, Question, GameStatus, Leaderboard, Country, ApiResponse) across client and server
- **Page Transitions**: Smooth navigation between game states with elegant transitions, LoadingOverlay components, and automatic state detection

### 🎨 Visual Design Elements
- **Gradient Backgrounds**: Unique vibrant animated backgrounds for each page (bg-country-selection-image with grid pattern overlay, bg-gameplay, bg-leaderboard) with floating radial gradients and geometric patterns defined in backgrounds.css
- **Glass Morphism UI**: Elegant white cards with glass morphism effects (card-texture-subtle with backdrop-filter: blur(10px)), rounded corners (rounded-2xl), and subtle shadow effects
- **Icon-Based Interface**: Clean circular white buttons with SVG icons - trophy icon for leaderboard access, forward arrow icon for skipping questions, back arrow for navigation
- **Typography System**: Consistent text sizing with game-specific utility classes (text-game-title, text-game-subtitle, text-game-body) and Inter font family with font-feature-settings
- **Interactive Elements**: Hover effects, button scaling, smooth transitions (transition-all duration-200), and loading animations throughout with backdrop blur effects
- **Loading States**: Skeleton screens (QuestionSkeleton, CountryListSkeleton, LeaderboardSkeleton with SkeletonLoader), LoadingOverlay components, and animated spinners for better user experience
- **Accessibility Features**: High contrast support (@media prefers-contrast), semantic HTML structure, touch-optimized interface elements, and reduced motion support (@media prefers-reduced-motion)
- **Country Selection**: Scrollable country list (country-list-container with 240px height) with real-time search functionality and elegant selection interface featuring 32x24px flag images (country-flag-image class) from flagcdn.com
- **Question Interface**: Clean QuestionCard components with dark gray multiple choice buttons (A, B, C, D), centered progress tracking below questions showing correct/total format with backdrop blur
- **Leaderboard Design**: Compact mobile-optimized design (max-height: 500px) with ranked country display, high-quality flag images, position badges (gold/silver/bronze/blue), and ProgressBar contribution visualization
- **Game Over Screen**: Dramatic presentation with skull emoji (💀) and backdrop blur effects, triggered after GameStatus.gameover = true
- **Minimalist Gameplay UI**: Clean top bar with skip counter (GameStatus.skips number + circular skip button) and circular trophy button for leaderboard access, centered question cards with progress display