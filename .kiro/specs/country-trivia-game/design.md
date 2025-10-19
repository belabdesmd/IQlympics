# Design Document

## Overview

The Country Trivia Game is a React-based application built on the Devvit platform that allows Reddit users to represent their countries in a competitive trivia environment. The application consists of three main pages: country selection, gameplay, and leaderboard, with a focus on mobile-first responsive design and vibrant visual presentation.

## Architecture

### Client-Server Architecture

The application follows the established Devvit pattern with clear separation between client and server:

- **Client (React)**: Handles UI rendering, user interactions, and API communication
- **Server (Express)**: Manages game logic, data persistence, and Reddit integration
- **Shared Types**: Ensures type safety across client-server communication

### State Management

- **Local Component State**: React useState for UI state management
- **API State**: Custom hooks for server communication and data fetching
- **Navigation State**: React Router or simple conditional rendering for page transitions

## Components and Interfaces

### Page Components

#### 1. CountrySelectionPage
- **Purpose**: Allow new players to select their representing country
- **Key Features**:
  - Country search functionality
  - Filterable country list with flags
  - Radio button selection
  - Conditional "Pick" button activation

#### 2. GameplayPage  
- **Purpose**: Main trivia gameplay interface
- **Key Features**:
  - Question display with 4 multiple-choice options
  - Skip functionality with counter
  - Progress tracking (correct/total questions)
  - Navigation to leaderboard

#### 3. LeaderboardPage
- **Purpose**: Display country rankings and player contributions
- **Key Features**:
  - Top 5 countries ranking
  - Player's country position
  - Contribution progress bar
  - Navigation back to gameplay

#### 4. GameOverPage
- **Purpose**: Terminal state for players who exceed error limit
- **Key Features**:
  - Full-screen red background
  - Game over imagery
  - Clear messaging about failure condition

#### 5. ErrorPage
- **Purpose**: Handle API failures and network errors
- **Key Features**:
  - Error state visualization
  - User-friendly error messaging

### Shared Components

#### CountryListItem
- **Props**: country (Country), selected (boolean), onSelect (function)
- **Features**: Flag display, country name, radio button

#### QuestionCard
- **Props**: question (Question), onAnswer (function)
- **Features**: Question text, 4 option buttons, answer validation

#### ProgressBar
- **Props**: current (number), total (number), percentage (number)
- **Features**: Visual progress indication, contribution display

### Custom Hooks

#### usePlayer
- **Purpose**: Manage player authentication and data
- **Returns**: player, loading, error, createPlayer function

#### useGameplay
- **Purpose**: Handle gameplay state and question management
- **Returns**: question, status, loading, answerQuestion, skipQuestion functions

#### useLeaderboard
- **Purpose**: Fetch and manage leaderboard data
- **Returns**: leaderboard, loading, error, refreshLeaderboard function

## Data Models

### Country Interface
```typescript
interface Country {
  countryCode: string;  // ISO 3166-1 alpha-2 code (e.g., "US", "FR")
  name: string;         // Full country name
  flag: string;         // Unicode flag emoji or image URL
}
```

### Player Interface (Extended)
```typescript
interface Player {
  username: string;
  countryCode: string;
}
```

### Question Interface
```typescript
interface Question {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
}
```

### GameStatus Interface
```typescript
interface GameStatus {
  username: string;
  skips: number;        // Number of skips already used
  gameover: boolean;
}
```

### Leaderboard Interface
```typescript
interface Leaderboard {
  topCountries: Array<{
    countryCode: string;
    points: number;
  }>;
  yourCountry: {
    countryCode: string;
    points: number;
    position: number;
  };
  contribution: number;  // Player's contribution percentage
}
```

## API Endpoints

### Player Management
- **GET /api/player**: Retrieve current player data
- **POST /api/player/create**: Create new player with country selection

### Gameplay
- **GET /api/status**: Get current game status (skips, game over state)
- **GET /api/gameplay/question**: Fetch new trivia question
- **POST /api/gameplay/answer**: Submit answer and get validation result
- **GET /api/gameplay/skip**: Skip current question (decrements available skips)

### Leaderboard
- **GET /api/leaderboard**: Retrieve global country rankings and player stats

## User Interface Design

### Design System

#### Color Palette
- **Primary**: Vibrant colors for backgrounds and buttons
- **Secondary**: White for card backgrounds
- **Accent**: Country-specific colors where applicable
- **Error**: Red (#FF0000) for error and game over states

#### Typography
- **Headers**: Bold, uppercase, large, rounded font
- **Body**: Bold for emphasis, normal case for questions
- **Buttons**: White text on colored backgrounds

#### Layout Principles
- **Mobile-First**: Responsive design prioritizing mobile experience
- **Centered Cards**: Content in white cards with border radius
- **Full-Screen Backgrounds**: Vibrant images covering entire viewport
- **Consistent Spacing**: Uniform padding and margins throughout

### Page Layouts

#### Country Selection Layout
```
[Vibrant Background Image]
  [Centered White Card]
    [Search Bar]
    [Scrollable Country List]
      [Country Item: Flag | Name | Radio]
    [Pick Button - Disabled/Enabled]
```

#### Gameplay Layout
```
[Vibrant Background Image]
  [Top Bar: Logo (center) | Leaderboard Button (right)]
  [Centered White Card]
    [Question Text]
    [4 Option Buttons]
  [Bottom Bar: Counter (center) | Skip Button + Count (right)]
```

#### Leaderboard Layout
```
[Vibrant Background Image]
  [Top Bar: Back Button (left) | "LEADERBOARD" (center)]
  [Centered White Card]
    [Top 5 Countries List]
    [Separator Bar]
    [Your Country Position]
    [Contribution Progress Bar]
    [Contribution Text]
```

## Error Handling

### Client-Side Error Handling
- **Network Failures**: Retry logic with exponential backoff
- **API Errors**: Display user-friendly error messages
- **Validation Errors**: Immediate feedback on invalid inputs
- **State Errors**: Graceful degradation and recovery

### Server-Side Error Handling
- **Database Errors**: Proper error logging and user feedback
- **Authentication Errors**: Clear messaging for auth failures
- **Rate Limiting**: Prevent abuse with appropriate limits
- **Data Validation**: Server-side validation for all inputs

### Error States
- **Loading States**: Skeleton screens and loading indicators
- **Empty States**: Helpful messaging when no data available
- **Error States**: Full-screen error pages with recovery options
- **Game Over States**: Clear terminal state messaging

## Testing Strategy

### Unit Testing
- **Component Testing**: React Testing Library for UI components
- **Hook Testing**: Custom hook functionality and state management
- **Utility Testing**: Pure functions and data transformations
- **API Testing**: Mock server responses and error conditions

### Integration Testing
- **Page Flow Testing**: Complete user journeys through the application
- **API Integration**: End-to-end testing of client-server communication
- **State Management**: Complex state transitions and data flow

### Performance Testing
- **Load Testing**: API endpoint performance under load
- **Rendering Performance**: React component rendering optimization
- **Mobile Performance**: Touch interactions and responsive behavior

### Accessibility Testing
- **Screen Reader**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliance for visual elements
- **Mobile Accessibility**: Touch target sizes and gestures

## Implementation Considerations

### Country Data Source
- **Static Data**: Embed country list in React application for performance
- **Data Format**: Use ISO 3166-1 alpha-2 codes for consistency
- **Flag Representation**: Unicode emoji flags for cross-platform compatibility
- **Search Optimization**: Implement efficient filtering algorithms

### Performance Optimization
- **Code Splitting**: Lazy load pages to reduce initial bundle size
- **Image Optimization**: Compress background images and assets
- **API Caching**: Cache frequently accessed data (countries, leaderboard)
- **State Optimization**: Minimize re-renders with proper state management

### Mobile Considerations
- **Touch Interactions**: Large touch targets for buttons and interactive elements
- **Responsive Images**: Serve appropriate image sizes for different screens
- **Performance**: Optimize for slower mobile networks and devices
- **User Experience**: Consider mobile-specific interaction patterns

### Security Considerations
- **Input Validation**: Sanitize all user inputs on both client and server
- **Rate Limiting**: Prevent abuse of API endpoints
- **Authentication**: Leverage Devvit's built-in Reddit authentication
- **Data Privacy**: Handle user data according to Reddit's privacy policies