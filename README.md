# 🌍 IQlympics - Global Knowledge Competition

**IQlympics** is an innovative competitive trivia experience where players represent their countries in a global battle of knowledge. Built for Reddit's Devvit platform, this game combines individual skill with national pride, creating a unique social gaming experience where every correct answer contributes to your country's global ranking.

## 🎮 What This Game Is

IQlympics is a **high-stakes trivia competition** where players select a nation to represent and answer challenging multiple-choice questions about geography, culture, history, and world knowledge. The game features a strategic skip system that allows players to avoid difficult questions, but with limited skips available. Every correct answer earns points for both the player and their chosen country, contributing to a live global leaderboard that ranks nations by their collective performance.

This isn't just another trivia game - it's a **patriotic competition** where your performance directly impacts your country's standing on the global leaderboard, creating a sense of national representation and community contribution that's unique in the trivia space.

## 🚀 What Makes IQlympics Innovative

### 🌟 Revolutionary Features That Set It Apart

**1. Olympic-Style National Competition** 🏅
- Choose from a comprehensive database of 249 countries and territories with high-quality flag images from flagcdn.com
- Represent your nation in global intellectual competition where every answer matters
- Creates unprecedented sense of national pride in a trivia format with real country selection

**2. Collective Impact Scoring System** 📊
- Individual points contribute to your country's total ranking in real-time
- Personal contribution analytics show exactly what percentage you've added to your nation's success
- Live global leaderboard displays top 5 countries with total accumulated points and position badges

**3. Strategic Skip System Gameplay** ⚡
- **Limited skip system** - players get a finite number of skips per session for tactical question avoidance
- **Strategic decision making** - choose wisely between answering and skipping to maximize your score
- **Game over after 5 wrong answers** - players can answer incorrectly up to 5 times before being eliminated from the current post

**4. Reddit-Native Social Gaming** 🎮
- Built specifically for Reddit's Devvit platform with seamless integration using React.js and TypeScript
- Mobile-first responsive design optimized for Reddit's mobile-heavy user base
- Elegant interface with smooth animations, gradient backgrounds, and card-based layouts

**5. Real-Time Community Building** 🌐
- Watch your country climb the global rankings as you and fellow citizens contribute
- Personal contribution tracking creates individual accountability within national success
- Combines personal achievement with collective national representation in a live leaderboard

**6. Advanced Technical Implementation** 🛠️
- Modern React.js frontend with TypeScript for complete type safety and robust error handling
- Custom hooks (usePlayer, useGameplay, useLeaderboard, useNavigation) for sophisticated state management
- Comprehensive error handling with retry mechanisms, loading states, and user-friendly feedback
- Skeleton loading screens and smooth page transitions for premium user experience

## 🎯 Core Game Mechanics

**The Challenge**: Answer multiple-choice trivia questions (4 options: A, B, C, D) correctly to earn points for yourself and your country. You can answer incorrectly up to 5 times per Reddit post before being eliminated with a dramatic game over screen.

**The Strategy**: You get a limited number of skips per game session (tracked in real-time). Use them wisely to avoid questions you're unsure about and preserve your remaining wrong answers for strategic gameplay.

**The Stakes**: Every correct answer adds points to both your personal score and your country's global ranking. Your individual contribution percentage is tracked and displayed with a visual progress bar.

**The Competition**: Countries compete globally based on the collective points earned by all their players. Check the live leaderboard to see how your nation ranks against the world with position badges and flag displays.

---

## 🎮 How to Play

### Step 1: Choose Your Country 🏳️
1. **Launch the game** from the Reddit post - the app automatically detects if you're a new player and routes to country selection
2. **Search countries** using the real-time search bar with instant filtering (supports partial matching of country names)
3. **Browse the scrollable list** of 249 countries and territories with high-quality flag images from flagcdn.com and full country names
4. **Select your nation** by clicking on any country in the list - it will be highlighted with a blue background when selected
5. **Confirm selection** with the green "Pick Country" button - you'll represent this country throughout all future games in this Reddit post

### Step 2: Answer Trivia Questions 🧠
1. **Read each question** carefully displayed on elegant white question cards with rounded corners and subtle card textures
2. **Choose your answer** from 4 multiple-choice options (A, B, C, D) presented as interactive gray buttons with hover effects and smooth transitions
3. **Get instant feedback** - correct answers automatically load the next question with smooth page transitions and loading states
4. **Track your progress** - monitor your correct answers vs total questions in the bottom progress counter (green correct/total format)
5. **Navigate easily** - access the leaderboard anytime via the yellow "Leaderboard" button in the top navigation bar with game logo

### Step 3: Strategic Skipping ⏭️
1. **Use skips wisely** - you have a limited number of skips per game session (tracked in real-time in the bottom bar)
2. **Skip difficult questions** by clicking the orange "Skip" button to avoid game-ending wrong answers and preserve your 5-mistake limit
3. **Monitor remaining skips** - the skip counter shows how many you have left in the format "Skip (X)" with loading states during skip processing
4. **Plan strategically** - save skips for the hardest questions as the button becomes disabled and grayed out when you run out

### Step 4: Game Over Conditions ☠️
- **5 Wrong Answers**: Game ends when you answer incorrectly 5 times in the current Reddit post with a dramatic skull emoji (💀) display and game over message
- **Strategic Gameplay**: Every question becomes a strategic decision between answering confidently or skipping safely to preserve your mistake allowance
- **Automatic Navigation**: Game automatically routes to the game over page when you reach the wrong answer limit with smooth transitions
- **Post-Based Sessions**: Each Reddit post allows up to 5 wrong answers before elimination - the game tracks this via GameStatus with gameover boolean

### Step 5: Check the Leaderboard 🏆
1. **Access leaderboard** via the yellow "Leaderboard" button during gameplay with backdrop blur effects and smooth navigation
2. **View global rankings** - see the top 5 countries with their flags, names, and total points in gradient-styled cards with position badges (1st, 2nd, 3rd)
3. **Find your country** - see your nation's position and ranking with a special highlighted section showing your exact rank and flag display
4. **Track contribution** - view your personal percentage contribution to your country's total points with a visual progress bar and percentage display
5. **Return to gameplay** - use the "Back to Game" or "← BACK" button to continue playing and boost your country's standing in the global competition

---

## 🏆 Scoring System

- **Correct Answer**: Points earned for you and your country (contributes to national total)
- **Wrong Answer**: Counts toward your 5-mistake limit per Reddit post - game over after 5 wrong answers
- **Skipped Question**: No points gained, but game continues and doesn't count as a wrong answer (strategic survival option)
- **Country Ranking**: Based on cumulative points from all players representing that country
- **Personal Contribution**: Your points calculated as a percentage of your country's total score and displayed with a progress bar

---

## 🛠 Technical Implementation

### Core Architecture
- **Platform**: Reddit Devvit Web Application with React.js frontend and Express.js backend
- **Frontend**: React.js with TypeScript, Tailwind CSS, custom hooks, and context providers
- **Backend**: Express.js server with Redis data persistence for player stats and game state
- **Build System**: Vite for both client and server builds with TypeScript project references

### API Architecture
- **RESTful Endpoints**: `/api/player`, `/api/gameplay/question`, `/api/gameplay/answer`, `/api/gameplay/skip`, `/api/leaderboard`, `/api/status`
- **Error Handling**: Comprehensive retry logic with exponential backoff and user-friendly error messages
- **Loading States**: Skeleton screens and loading overlays for all major operations

### Frontend Features
- **Smart Navigation**: NavigationContext with AppRouter for automatic page transitions based on game state
- **Component Library**: Modular React components (QuestionCard, CountryListItem, ProgressBar, LoadingButton, Toast system)
- **State Management**: Custom hooks (usePlayer, useGameplay, useLeaderboard, useNavigation) for comprehensive data management
- **Responsive Design**: Mobile-first approach with touch-optimized buttons, cards, and gradient backgrounds
- **Visual Design**: Tailwind CSS with custom game-specific utility classes and gradient backgrounds

### Data & Content
- **Country Database**: Complete dataset of 249 countries and territories with ISO 3166-1 alpha-2 codes and high-quality flag images
- **Search Functionality**: Real-time country search with instant filtering and partial matching
- **Progress Tracking**: Live counters for correct answers, total questions, and remaining skips

---

## 🎯 Game Strategy Tips

1. **Master the Skip System**: Save your limited skips for genuinely difficult questions to preserve your wrong answer allowance
2. **Contribute Consistently**: Regular gameplay sessions increase your country's ranking
3. **Risk vs. Reward**: Sometimes skipping is better than risking a wrong answer that counts toward your 5-mistake limit
4. **Monitor Leaderboards**: Check your country's progress and your contribution percentage
5. **Play Regularly**: Consistent participation helps maintain your country's global position
6. **Learn from Mistakes**: You get 5 wrong answers per Reddit post, so use them as learning opportunities
7. **Choose Wisely**: Take time to read each question carefully before committing to an answer

---

## 🌐 Global Competition

The game creates a unique dynamic where individual performance contributes to collective national success. Players develop a sense of responsibility to their country while enjoying personal achievement. The leaderboard system encourages both individual skill development and national pride, making every game session meaningful beyond personal entertainment.

## 🎮 Current Implementation Status

### ✅ Fully Implemented Features
- **5 Complete Pages**: Country Selection, Gameplay, Leaderboard, Game Over, and Error screens with full functionality
- **Smart Navigation**: Automatic routing with NavigationContext and AppRouter components that detect player state and handle page transitions
- **Rich UI Components**: QuestionCard, CountryListItem, ProgressBar, LoadingButton with hover effects and smooth animations
- **Custom React Hooks**: usePlayer, useGameplay, useLeaderboard, useNavigation for comprehensive state management
- **Complete API Integration**: All endpoints connected with proper error handling, loading states, and retry mechanisms
- **Comprehensive Country Database**: Complete dataset of 249 countries and territories with high-quality flag images and real-time search functionality
- **Strategic Gameplay**: Limited skip system with tactical decision-making, 5-mistake elimination system with skull emoji display, and progress tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS, gradient backgrounds, and touch-optimized buttons
- **Progress Tracking**: Live counters for correct answers, total questions, and remaining skips with visual feedback
- **Contribution System**: Personal percentage calculation of country's total points with progress bar visualization
- **Error Boundary**: Comprehensive error handling with ErrorBoundary component and user-friendly error messages
- **Toast Notifications**: Real-time feedback system for user actions and API responses with ToastProvider integration
- **Loading States**: Skeleton screens for all major components (CountryListSkeleton, QuestionSkeleton, LeaderboardSkeleton)
- **Retry Logic**: Built-in retry mechanisms with exponential backoff for failed API calls
- **Page Transitions**: Smooth navigation between game states with elegant transitions and loading overlays

### 🎨 Visual Design Elements
- **Gradient Backgrounds**: Unique vibrant backgrounds for each page (country selection: image background, gameplay: grid pattern, leaderboard: dots pattern, game over: diagonal pattern)
- **Card-Based Layout**: Elegant white cards with subtle textures, rounded corners, and shadow effects using custom CSS classes
- **Color-Coded Interface**: Interactive buttons for answers, yellow for leaderboard navigation, orange for skip actions, green for progress, red for errors
- **Typography System**: Consistent text sizing with game-specific utility classes (text-game-title, text-game-subtitle, text-game-body)
- **Interactive Elements**: Hover effects, button scaling, smooth transitions, and loading animations throughout with backdrop blur effects
- **Loading States**: Skeleton screens, loading overlays, and animated spinners for better user experience during API calls
- **Accessibility Features**: High contrast support, semantic HTML structure, touch-optimized interface elements, and reduced motion support
- **Country Selection**: Scrollable country list with real-time search functionality and elegant card-based selection interface featuring high-quality flag images from flagcdn.com
- **Question Interface**: Clean question cards with multiple choice buttons, progress tracking, and clear typography
- **Leaderboard Design**: Ranked country display with flags, position badges, contribution progress bars, and gradient styling
- **Game Over Screen**: Dramatic presentation with skull emoji and backdrop blur effects, triggered after 5 wrong answers per Reddit post