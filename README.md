# IQlympics - Global Trivia Competition

IQlympics is a competitive trivia game built for Reddit using the Devvit platform, where players
represent their countries in a global knowledge competition. Every correct answer contributes points
to your nation's leaderboard position, creating a unique blend of individual skill and national
pride.

[![Watch the video](https://img.youtube.com/vi/0lVMWqNS5qk/maxresdefault.jpg)](https://youtu.be/0lVMWqNS5qk)

## Core Game Features

- **Country Representation**: Choose from 195+ countries.
- **Multiple-Choice Trivia**: Answer challenging questions across various knowledge topics.
- **National Scoring System**: Every correct answer adds points to your country's total score on
  the global leaderboard.
- **Skip System**: Use exactly 3 skips per game to avoid difficult questions.
- **Personal Impact Tracking**: View your exact contribution percentage to your country's success.
- **Live Global Competition**: Watch real-time leaderboard updates as countries battle for first
  position.
- **High-Stakes Elimination**: Face elimination after 5 incorrect answers, making each question a
  critical decision
- **Advanced Stats Tracking**: Real-time display of both your answer streak (🔥) and wrong answer
  count (❌) for complete performance awareness with live elimination countdown
- **Top Player Recognition**: See the top contributing player from your country with their
  contribution percentage

The game creates genuine national pride in trivia gaming, where individual knowledge directly
impacts collective national achievement. With limited skips and elimination pressure, every question
becomes a strategic decision between risking an answer or preserving your precious resources.

### Technical Architecture

**Platform**: Reddit Devvit Web Application  
**Frontend**: React 18 with TypeScript  
**Backend**: Express.js with Redis data persistence  
**Build System**: Vite with TypeScript project references  
**Styling**: Tailwind CSS with custom animations and responsive design  
**Country Data**: 195+ countries with authentic flag integration

## Development Status

### [x] **Fully Implemented & Tested Features**

**Complete Game Flow**:

- [x] **Engaging Splash Screen**: Dynamic podium display with live top 3 countries, medals, and "
  Join
  Competition" call-to-action
- [x] **Player Registration**: Country selection from 195+ countries with authentic flags and
  real-time search functionality
- [x] **Real-time Trivia Gameplay**: Multiple-choice questions with immediate visual feedback and
  smooth animations
- [x] **Skip System**: Exactly 3 skips per game session with live counter display and strategic
  decision-making
- [x] **Live Global Leaderboard**: Top 5 country rankings with personal contribution tracking and
  animated progress bars
- [x] **Game Over Handling**: Elimination screen after 5 incorrect answers with clear messaging
- [x] **Seamless Navigation**: Fluid transitions between all game screens with proper state
  management
- [x] **Player Detection**: Automatic detection of returning players vs. new player registration

**Professional UI & UX**:

- [x] **Mobile-First Design**: Responsive card-based layout with blue wave background optimized for
  Reddit's mobile users
- [x] **Touch Optimization**: Proper button sizing (minimum 44px height), spacing, and
  touch-friendly
  interactions
- [x] **Smooth Animations**: Professional CSS animations for answer feedback, loading states, and
  page
  transitions
- [x] **Loading States**: Professional loading indicators and comprehensive error handling with
  retry
  functionality
- [x] **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support
- [x] **Country Search**: Real-time filtering with visual flag displays and live country count
  updates

**Technical Implementation**:

- [x] **Type Safety**: Complete TypeScript implementation with strict type checking across client,
  server, and shared modules
- [x] **Error Boundaries**: React error boundaries with graceful error handling and user-friendly
  messages
- [x] **API Integration**: Full client-server communication using fetch with proper error handling
  and
  retry logic
- [x] **State Management**: Complete app state handling across all game screens with proper
  navigation
  flow
- [x] **Build System**: Optimized Vite configuration with TypeScript project references and hot
  reloading
- [x] **Component Architecture**: Modular React components with proper separation of concerns and
  reusability

All core mechanics are fully functional with comprehensive error handling, smooth animations, and
mobile-optimized design. The game features a complete elimination system where players face
strategic decisions with each question, knowing that 5 incorrect answers will end their session,
creating genuine tension and engagement. Players can track their consecutive correct answers with a
live streak counter and compete to become their country's top contributor.

### For Developers

**Development Commands**:

```bash
# Start development server with hot reloading
npm run dev

# Build for production
npm run build

# Deploy to Reddit
npm run deploy

# Run code quality checks
npm run check
```

**Testing the Game**:

1. Run `npm run dev` to start the Devvit playtest environment
2. Open the provided Reddit playtest URL in your browser
3. Click "Launch App" to test the full-screen game experience
4. All backend functionality requires the Devvit environment for proper Reddit integration
