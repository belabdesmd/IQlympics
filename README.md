# 🌍 IQlympics - Global Knowledge Competition

**IQlympics** is an innovative competitive trivia experience where players represent their countries in a global battle of knowledge. Built for Reddit's Devvit platform, this game combines individual skill with national pride, creating a unique social gaming experience where every correct answer contributes to your country's global ranking.

## 🎮 What This Game Is

IQlympics is a **high-stakes trivia competition** where players select a nation to represent and answer challenging multiple-choice questions (A, B, C, D format). The game features a strategic skip system that allows players to avoid difficult questions, but with limited skips available per session. Players face elimination after making 5 incorrect answers in a single Reddit post, creating tension and strategic decision-making in every question.

Every correct answer earns points for both the player and their chosen country, contributing to a live global leaderboard that ranks nations by their collective performance. This isn't just another trivia game - it's a **patriotic competition** where your performance directly impacts your country's standing on the global leaderboard, creating a sense of national representation and community contribution that's unique in the trivia space.

The game features a modern React.js interface with elegant glass morphism design, vibrant animated blue backgrounds with scattered circular patterns, and smooth page transitions. Players navigate through country selection, gameplay, leaderboards, and game over screens with intelligent routing that automatically detects player state and game conditions.

### 🎯 Core Game Mechanics

- **Country Selection**: Choose from 249 countries and territories to represent with real-time search functionality and high-quality flag images from flagcdn.com (24x18px with rounded corners)
- **Multiple Choice Questions**: Answer 4-option trivia questions (A, B, C, D) with elegant white question cards and black button styling featuring uppercase italic text
- **Strategic Skip System**: Limited skips per session tracked in real-time with circular white skip button (⏭️) - use them wisely to avoid elimination
- **5-Strike Elimination**: Game over after 5 incorrect answers in one Reddit post with dramatic skull emoji (💀) game over screen
- **Live Progress Tracking**: Monitor your correct answers vs total questions with simplified green/gray visual counters (correct/total format)
- **Global Leaderboard**: See how your country ranks against the world with top 5 display, position badges (gold/silver/bronze/blue), and flag displays
- **Personal Contribution**: Track your exact percentage contribution to your country's total points with animated progress bars
- **Smart Navigation**: Intelligent routing system automatically detects player state and navigates to appropriate screens with circular icon buttons

## 🚀 What Makes IQlympics Innovative

### 🌟 Revolutionary Features That Set It Apart

**1. Olympic-Style National Competition** 🏅
- Choose from a comprehensive database of 249 countries and territories with high-quality flag images from flagcdn.com
- Represent your nation in global intellectual competition where every answer matters
- Creates unprecedented sense of national pride in a trivia format with intuitive country selection interface
- Real-time country search with instant filtering and partial matching using advanced search algorithms

**2. Collective Impact Scoring System** 📊
- Individual points contribute to your country's total ranking in real-time through sophisticated aggregation
- Personal contribution analytics show exactly what percentage you've added to your nation's success with visual progress bars
- Live global leaderboard displays top 5 countries with total accumulated points, position badges (gold/silver/bronze), and flag displays
- Your performance directly impacts your country's global standing, creating meaningful individual responsibility

**3. Strategic Skip System Gameplay** ⚡
- **Limited skip system** - players get a finite number of skips per session tracked in real-time with visual counter
- **Strategic decision making** - choose wisely between answering and skipping to maximize your score and avoid elimination
- **5-mistake elimination** - players face game over after answering incorrectly 5 times in the current Reddit post
- **Icon-based interface** - clean circular white skip button (⏭️) with remaining skip count displayed prominently

**4. Reddit-Native Social Gaming** 🎮
- Built specifically for Reddit's Devvit platform with seamless integration using React.js and TypeScript
- Mobile-first responsive design optimized for Reddit's mobile-heavy user base with constrained layout (max-height: 500px/560px)
- Elegant interface with smooth animations, vibrant blue animated background with scattered circular patterns, and card-based layouts with glass morphism effects
- Intelligent routing system with NavigationContext and AppRouter that automatically detects player state and navigates to appropriate screens

**5. Real-Time Community Building** 🌐
- Watch your country climb the global rankings as you and fellow citizens contribute points
- Personal contribution tracking creates individual accountability within national success
- Combines personal achievement with collective national representation in a scrollable live leaderboard
- Creates a sense of community and national pride unique in the trivia space with real-time updates

**6. Advanced Technical Implementation** 🛠️
- Modern React.js frontend with TypeScript for complete type safety and robust error handling
- Custom hooks (usePlayer, useGameplay, useLeaderboard) for sophisticated state management with retry logic and error recovery
- Intelligent routing system with NavigationContext and AppRouter for automatic page transitions based on game state detection
- Comprehensive error handling with ErrorBoundary, retry mechanisms, loading states, and user-friendly feedback
- Skeleton loading screens (QuestionSkeleton, LeaderboardSkeleton, CountryListSkeleton) with smooth loading animations
- Glass morphism UI effects with backdrop blur, rounded corners (rounded-3xl), and subtle shadows for modern aesthetic
- Vibrant blue animated background with scattered circular patterns using static positioning for consistent visual appeal
- RESTful API architecture with Express.js backend and Redis data persistence for scalable multiplayer functionality

## 🎯 Core Game Mechanics

**The Challenge**: Answer multiple-choice trivia questions (4 options: A, B, C, D) correctly to earn points for yourself and your country. The game tracks your performance and eliminates players who make 5 incorrect answers in the current Reddit post, creating high-stakes decision making.

**The Strategy**: You get a limited number of skips per game session (tracked in real-time and displayed as a number next to the skip button). Use them wisely to avoid questions you're unsure about and preserve your chances for strategic gameplay. Each skip is precious and could save you from elimination.

**The Stakes**: Every correct answer adds points to both your personal score and your country's global ranking. Your individual contribution percentage is tracked and displayed with a visual progress bar showing your exact contribution to your nation's total points, creating personal accountability within national success.

**The Competition**: Countries compete globally based on the collective points earned by all their players. Check the live leaderboard to see how your nation ranks against the world with position badges (gold/silver/bronze/blue), flag displays, and scrollable interface showing real-time rankings.

---

## 🎮 How to Play

### Step 1: Choose Your Country 🏳️
1. **Launch the game** from the Reddit post - the app automatically detects if you're a new player using intelligent routing and navigates to country selection
2. **Search countries** using the real-time search bar with instant filtering (supports partial matching of country names)
3. **Browse the scrollable list** of 249 countries and territories with high-quality flag images (24x18px with rounded corners) and full country names
4. **Select your nation** by clicking on any country in the list - it will be highlighted with blue background and custom radio button selection with blue accent color
5. **Confirm selection** with the black "Pick Country" button - you'll represent this country throughout all future games in this Reddit post

### Step 2: Answer Trivia Questions 🧠
1. **Read each question** carefully displayed on elegant white question cards with rounded corners (rounded-3xl) and glass morphism effects
2. **Choose your answer** from 4 multiple-choice options (A, B, C, D) presented as interactive black buttons with uppercase italic styling and smooth hover transitions
3. **Get instant feedback** - correct answers automatically load the next question with smooth page transitions and loading overlays
4. **Track your progress** - monitor your correct answers vs total questions in the simplified progress counter (green correct / gray total) displayed below the question area
5. **Navigate easily** - access the leaderboard anytime via the circular star button (⭐) in the top-right corner

### Step 3: Strategic Skipping ⏭️
1. **Use skips wisely** - you have a limited number of skips per game session (tracked and displayed in real-time in the top-left corner with white text counter)
2. **Skip difficult questions** by clicking the circular white skip button (⏭️) with double arrow icon to avoid game-ending wrong answers
3. **Monitor remaining skips** - the skip counter shows how many you have left as a number next to the skip button with real-time updates
4. **Plan strategically** - save skips for the hardest questions as the button becomes disabled and grayed out when you run out

### Step 4: Game Over Conditions ☠️
- **5-Mistake Limit**: Game ends when you make 5 incorrect answers in the current Reddit post with automatic detection
- **Dramatic Display**: Game over page shows skull emoji (💀) and message: "You answered wrong 5 times in this post, you can't play anymore"
- **Strategic Gameplay**: Every question becomes a strategic decision between answering confidently or skipping safely
- **Automatic Navigation**: The game automatically detects game over conditions using useGameplay hook and transitions to the game over screen
- **Post-Based Sessions**: Each Reddit post tracks your performance independently - you can play again in different posts

### Step 5: Check the Leaderboard 🏆
1. **Access leaderboard** via the circular star button (⭐) during gameplay with smooth page transitions
2. **View global rankings** - see the top 5 countries with their flags, names, and total points with position badges (1st gold, 2nd silver, 3rd bronze, others blue)
3. **Find your country** - see your nation's position and ranking with a special highlighted purple section showing your exact rank and flag
4. **Track contribution** - view your personal percentage contribution to your country's total points with an animated progress bar and real-time updates
5. **Return to gameplay** - use the circular back arrow button (←) in the top-left to continue playing and boost your country's standing

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
- **Responsive Design**: Mobile-first approach with constrained layout (max-height: 500px/560px) optimized for Reddit's webview
- **Visual Design**: Tailwind CSS with custom game-specific utility classes, vibrant animated blue backgrounds with scattered circular patterns, and glass morphism effects
- **Error Handling**: Comprehensive ErrorBoundary with retry mechanisms and user-friendly error messages

### Data & Content
- **Country Database**: Complete dataset of 249 countries and territories with ISO 3166-1 alpha-2 codes and high-quality flag images (24x18px from flagcdn.com)
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

The game uses intelligent routing with NavigationContext and AppRouter that automatically determines the appropriate page based on player state:

1. **Initial Load**: App checks if player exists using usePlayer hook with loading display during player fetch and error handling
2. **New Players**: Automatically routed to CountrySelectionPage if no player found with smooth page transitions
3. **Existing Players**: Routed to GameplayPage to continue playing with automatic question fetching via useGameplay hook
4. **Smart Navigation**: NavigationContext manages page transitions between country selection, gameplay, leaderboard, game over, and error pages with loading states
5. **Automatic Routing**: Game over conditions trigger automatic navigation to GameOverPage using game status detection
6. **Error Recovery**: ErrorBoundary catches errors and provides retry mechanisms with user-friendly messages and RetryHandler with exponential backoff

## 🎮 Current Implementation Status

### ✅ Fully Implemented Features

**Core Game Pages**
- **CountrySelectionPage**: Complete country selection with real-time search functionality and 249 countries/territories with flag images (24x18px from flagcdn.com)
- **GameplayPage**: Full trivia gameplay with QuestionCard components, strategic skip system, and live progress tracking
- **LeaderboardPage**: Global rankings with top 5 countries display, personal contribution tracking, and scrollable interface
- **GameOverPage**: Dramatic game over screen with skull emoji (💀) and elimination message
- **ErrorPage**: Comprehensive error handling with retry mechanisms and user-friendly error messages

**Smart Navigation System**
- **AppRouter**: Automatic routing based on player state and game conditions using intelligent state detection
- **NavigationContext**: Seamless page transitions with loading states, error handling, and smooth animations
- **Intelligent State Detection**: Automatically navigates to appropriate screens based on player existence and game status using custom hooks

**Rich UI Components**
- **QuestionCard**: Interactive multiple-choice questions with A, B, C, D options and black button styling with uppercase italic text
- **CountryListItem**: Selectable country items with flags (24x18px from flagcdn.com) and custom radio button interface with blue accent color (#0aa4fc)
- **ProgressBar**: Visual progress tracking for contributions and game progress with animated fills
- **LoadingButton**: Interactive buttons with loading states, animations, and disabled states
- **Skeleton Loaders**: Loading screens (QuestionSkeleton, LeaderboardSkeleton, CountryListSkeleton) for smooth UX

**Advanced Gameplay Features**
- **Strategic Skip System**: Limited skips per session with real-time counter display (number shown next to skip button) and visual feedback
- **5-Strike Elimination**: Game over after 5 incorrect answers with automatic detection via useGameplay hook
- **Progress Tracking**: Live counters for correct answers vs total questions (green/gray format) with visual indicators
- **Country Contribution**: Personal percentage calculation of country's total points with progress bar visualization

**Technical Implementation**
- **Custom React Hooks**: usePlayer, useGameplay, useLeaderboard for sophisticated state management with retry logic
- **Complete API Integration**: All endpoints (/api/player, /api/gameplay/question, /api/gameplay/answer, /api/gameplay/skip, /api/leaderboard, /api/status) with proper error handling
- **Type Safety**: Complete TypeScript implementation with shared types (Player, Question, GameStatus, Leaderboard, Country) across client and server
- **Error Boundary**: Comprehensive error handling with ErrorBoundary component and user-friendly messages
- **Retry Logic**: RetryHandler with exponential backoff and ErrorHandler for normalized error responses

### 🎨 Visual Design Elements

**Modern UI Design**
- **Gradient Backgrounds**: Unique vibrant blue animated background (bg-country-selection-image) with scattered circular patterns and static positioning for consistent visual appeal
- **Glass Morphism Effects**: Elegant white cards (card-texture-subtle) with backdrop blur, rounded corners (rounded-3xl), and subtle shadows
- **Icon-Based Interface**: Clean circular white buttons with SVG icons for navigation (skip ⏭️, leaderboard ⭐, back ←) and smooth hover effects
- **Typography System**: Consistent text sizing with Inter font family, advanced font features, uppercase tracking, and italic styling for buttons

**Interactive Elements**
- **Hover Effects**: Smooth button color transitions (black to gray-800) and scaling effects throughout the interface
- **Loading Animations**: Skeleton screens with pulsing animations, loading overlays (LoadingOverlay), and smooth transitions
- **Touch-Optimized**: Mobile-first design (max-height: 500px/560px) with touch-friendly circular buttons optimized for Reddit mobile
- **Accessibility Features**: High contrast support, semantic HTML, reduced motion support, and proper focus states

**Game-Specific Design**
- **Country Selection**: Scrollable list (country-list-container, 240px height) with real-time search and high-quality flag images (24x18px with rounded corners) and custom radio buttons with blue accent color (#0aa4fc)
- **Question Interface**: Clean white question cards with black multiple choice buttons featuring uppercase italic styling and letter prefixes (A, B, C, D)
- **Leaderboard Design**: Ranked country display with colored position badges (gold/silver/bronze/blue), flag visualization, and scrollable interface with gradient backgrounds
- **Game Over Screen**: Dramatic presentation with skull emoji (💀), backdrop blur effects, and elegant white card layout with rounded corners