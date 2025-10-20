# 🌍 IQlympics - Global Country Trivia Championship

**IQlympics** is an innovative competitive trivia experience where players represent their countries in a global battle of knowledge. Built for Reddit's Devvit platform, this game combines individual skill with national pride, creating a unique social gaming experience where every correct answer contributes to your country's global ranking.

## 🎮 What This Game Is

IQlympics is a **high-stakes country trivia competition** where players select a nation to represent and answer challenging multiple-choice questions about geography, culture, history, and world knowledge. The game features an unforgiving "one wrong answer and you're out" mechanic, balanced by a strategic skip system that allows players to avoid difficult questions. Every correct answer earns points for both the player and their chosen country, contributing to a live global leaderboard that ranks nations by their collective performance.

This isn't just another trivia game - it's a **patriotic competition** where your performance directly impacts your country's standing on the global leaderboard, creating a sense of national representation and community contribution that's unique in the trivia space.

## 🚀 What Makes IQlympics Innovative

### 🌟 Revolutionary Features That Set It Apart

**1. Olympic-Style National Competition** 🏅
- Choose from 249 countries and territories with authentic Unicode flag emojis and ISO country codes
- Represent your nation in global intellectual competition where every answer matters
- Creates unprecedented sense of national pride in a trivia format

**2. Collective Impact Scoring System** 📊
- Individual points contribute to your country's total ranking in real-time
- Personal contribution analytics show exactly what percentage you've added to your nation's success
- Live global leaderboard displays top 5 countries with total accumulated points

**3. High-Stakes Strategic Gameplay** ⚡
- **One wrong answer = instant game over** - no second chances, maximum tension
- **Strategic skip system** - limited skips add tactical depth and resource management
- Every question becomes a strategic decision: answer confidently or skip safely

**4. Reddit-Native Social Gaming** 🎮
- Built specifically for Reddit's Devvit platform with seamless integration
- Mobile-first responsive design optimized for Reddit's mobile-heavy user base
- Elegant React.js interface with smooth animations and transitions

**5. Real-Time Community Building** 🌐
- Watch your country climb the global rankings as you and fellow citizens contribute
- Personal contribution tracking creates individual accountability within national success
- Combines personal achievement with collective national representation

**6. Advanced Technical Implementation** 🛠️
- Modern React.js frontend with TypeScript for type safety
- Custom hooks and context providers for sophisticated state management
- Comprehensive error handling with retry mechanisms and user-friendly feedback
- Skeleton loading screens and smooth page transitions for premium user experience

## 🎯 Core Game Mechanics

**The Challenge**: Answer trivia questions correctly to earn points for yourself and your country, but one wrong answer ends your session immediately.

**The Strategy**: You get exactly 3 skips per game session. Use them wisely to avoid questions you're unsure about, because guessing wrong means game over.

**The Stakes**: Every correct answer adds +1 point to both your personal score and your country's global ranking. Your individual contribution percentage is tracked and displayed.

**The Competition**: Countries compete globally based on the collective points earned by all their players. Check the live leaderboard to see how your nation ranks against the world.

---

## 🎮 How to Play

### Step 1: Choose Your Country 🏳️
1. **Launch the game** from the Reddit post - the app automatically detects if you're a new player
2. **Search countries** using the real-time search bar with instant filtering (supports partial matching)
3. **Browse the scrollable list** of 249 countries and territories with authentic flag emojis and full country names
4. **Select your nation** by clicking on any country in the list (radio button selection)
5. **Confirm selection** with the "Pick Country" button - you'll represent this country throughout all future games

### Step 2: Answer Trivia Questions 🧠
1. **Read each question** carefully displayed on elegant white question cards with rounded corners
2. **Choose your answer** from 4 multiple-choice options (A, B, C, D) in styled blue buttons
3. **Get instant feedback** - correct answers automatically load the next question with smooth transitions
4. **Track your progress** - monitor your correct/total ratio in the bottom progress counter
5. **Navigate easily** - access the leaderboard anytime via the yellow "Leaderboard" button in the top navigation bar

### Step 3: Strategic Skipping ⏭️
1. **Use skips wisely** - you have a limited number of skips per game session (tracked in real-time)
2. **Skip difficult questions** by clicking the orange "Skip" button to avoid game-ending wrong answers
3. **Monitor remaining skips** - the skip counter shows how many you have left in the format "Skip (X)"
4. **Plan strategically** - save skips for the hardest questions as the button becomes disabled when you run out

### Step 4: Game Over Conditions ☠️
- **Wrong Answer**: Game ends immediately when you select an incorrect answer
- **High Stakes**: Every question becomes a strategic decision between answering and skipping
- **Automatic Navigation**: Game automatically routes to the game over page when you answer incorrectly
- **Session-Based**: Each game session ends when you make a wrong choice - use your skips wisely!

### Step 5: Check the Leaderboard 🏆
1. **Access leaderboard** via the yellow "Leaderboard" button during gameplay
2. **View global rankings** - see the top 5 countries with their flags, names, and total points
3. **Find your country** - see your nation's position and ranking with a special highlighted section
4. **Track contribution** - view your personal percentage contribution to your country's total points with a visual progress bar
5. **Return to gameplay** - use the "Back to Game" button to continue playing and boost your country's standing

---

## 🏆 Scoring System

- **Correct Answer**: +1 point for you and your country (contributes to national total)
- **Wrong Answer**: Immediate game over - session ends
- **Skipped Question**: No points gained, but game continues (strategic option)
- **Country Ranking**: Based on cumulative points from all players representing that country
- **Personal Contribution**: Your points calculated as a percentage of your country's total score

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
- **Country Database**: Complete dataset of 249 countries and territories with ISO 3166-1 alpha-2 codes and Unicode flag emojis
- **Search Functionality**: Real-time country search with instant filtering and partial matching
- **Progress Tracking**: Live counters for correct answers, total questions, and remaining skips

---

## 🎯 Game Strategy Tips

1. **Master the Skip System**: Save your 3 skips for genuinely difficult questions
2. **Contribute Consistently**: Regular gameplay sessions increase your country's ranking
3. **Risk vs. Reward**: Sometimes skipping is better than guessing and ending the game
4. **Monitor Leaderboards**: Check your country's progress and your contribution percentage
5. **Play Regularly**: Consistent participation helps maintain your country's global position
6. **Learn from Game Overs**: Each wrong answer teaches you for future sessions

---

## 🌐 Global Competition

The game creates a unique dynamic where individual performance contributes to collective national success. Players develop a sense of responsibility to their country while enjoying personal achievement. The leaderboard system encourages both individual skill development and national pride, making every game session meaningful beyond personal entertainment.

## 🎮 Current Implementation Status

### ✅ Fully Implemented Features
- **5 Complete Pages**: Country Selection, Gameplay, Leaderboard, Game Over, and Error screens with full functionality
- **Smart Navigation**: Automatic routing with NavigationContext and AppRouter components that detect player state
- **Rich UI Components**: QuestionCard, CountryListItem, ProgressBar, LoadingButton with hover effects and animations
- **Custom React Hooks**: usePlayer, useGameplay, useLeaderboard for comprehensive state management
- **Complete API Integration**: All endpoints connected with proper error handling, loading states, and retry mechanisms
- **Comprehensive Country Database**: Complete dataset of 249 countries and territories with authentic Unicode flags, ISO 3166-1 alpha-2 codes, and real-time search functionality
- **Strategic Gameplay**: 3-skip system with tactical decision-making, instant game over, and progress tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS, gradient backgrounds, and touch-optimized buttons
- **Progress Tracking**: Live counters for correct answers, total questions, and remaining skips with visual feedback
- **Contribution System**: Personal percentage calculation of country's total points with progress bar visualization
- **Error Boundary**: Comprehensive error handling with ErrorBoundary component and user-friendly error messages
- **Toast Notifications**: Real-time feedback system for user actions and API responses
- **Loading States**: Skeleton screens for all major components (CountryListSkeleton, QuestionSkeleton, LeaderboardSkeleton)
- **Retry Logic**: Built-in retry mechanisms with exponential backoff for failed API calls
- **Page Transitions**: Smooth navigation between game states with PageTransition component
- **Toast System**: Real-time user feedback with Toast and ToastContainer components

### 🎨 Visual Design Elements
- **Gradient Backgrounds**: Unique vibrant backgrounds for each page (country selection: dots pattern, gameplay: grid pattern, leaderboard: dots pattern)
- **Card-Based Layout**: Elegant white cards with subtle textures, rounded corners, and shadow effects
- **Color-Coded Interface**: Blue for answers, yellow for leaderboard navigation, orange for skip actions, green for progress, red for errors
- **Typography System**: Consistent text sizing with game-specific utility classes (text-game-title, text-game-subtitle, text-game-body)
- **Interactive Elements**: Hover effects, button scaling, smooth transitions, and loading animations throughout
- **Loading States**: Skeleton screens, loading overlays, and animated spinners for better user experience
- **Accessibility Features**: High contrast support, reduced motion preferences, and semantic HTML structure