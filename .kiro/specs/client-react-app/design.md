# Design Document

## Overview

The IQlympics client React application is a country-based trivia game that provides an engaging user interface for players to register, answer questions, track progress, and view leaderboards. The application follows a component-based architecture with React, TypeScript, and modern CSS styling. It communicates with predefined API endpoints and maintains a consistent visual theme throughout the user experience.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   App Router    │  │  State Manager  │  │ API Service  │ │
│  │   (React)       │  │   (useState)    │  │   (fetch)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Create Player   │  │   Gameplay      │  │ Leaderboard  │ │
│  │   Component     │  │   Component     │  │  Component   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ Shared UI       │  │ Country Flags   │  │ Error        │ │
│  │ Components      │  │   Library       │  │ Handling     │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer                                │
│  /api/player • /api/player/create • /api/gameplay/status    │
│  /api/gameplay/answer • /api/gameplay/skip • /api/leaderboard│
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── CreatePlayer
│   ├── CountrySearch
│   ├── CountryList
│   └── CreateButton
├── Gameplay
│   ├── GameHeader (skips, leaderboard button)
│   ├── Question
│   └── AnswerOptions
├── Leaderboard
│   ├── TopCountries
│   ├── PlayerCountry
│   └── ContributionBar
├── GameOver
└── Error
```

## Components and Interfaces

### Core Components

#### App Component
- **Purpose**: Main application router and state management
- **Responsibilities**: 
  - Initial player check via `/api/player`
  - Route management between components
  - Global error handling
  - Theme and styling application

#### CreatePlayer Component
- **Purpose**: Handle new player registration with country selection
- **Key Features**:
  - Searchable country list with flags
  - Radio button selection
  - Form validation
  - API integration with `/api/player/create`

#### Gameplay Component
- **Purpose**: Core trivia gameplay interface
- **Key Features**:
  - Question display
  - Four answer options with visual feedback
  - Skip functionality with counter
  - Navigation to leaderboard
  - Game state management

#### Leaderboard Component
- **Purpose**: Display country rankings and player contribution
- **Key Features**:
  - Top 5 countries display
  - Player's country position
  - Contribution percentage visualization
  - Navigation back to gameplay

### API Service Layer

#### API Client Interface
```typescript
interface APIClient {
  getPlayer(): Promise<ApiResponse<Player>>;
  createPlayer(countryCode: string): Promise<ApiResponse<Player>>;
  getGameStatus(): Promise<ApiResponse<GameStatus>>;
  submitAnswer(optionIndex: number): Promise<ApiResponse<boolean>>;
  skipQuestion(): Promise<ApiResponse<Question>>;
  getLeaderboard(): Promise<ApiResponse<Leaderboard>>;
}
```

#### Error Handling Strategy
- Consistent error response format using `ApiResponse<T>` wrapper
- Network error handling with user-friendly messages
- Automatic retry logic for transient failures
- Fallback UI states for error conditions

## Data Models

### State Management Structure

```typescript
interface AppState {
  currentView: 'loading' | 'createPlayer' | 'gameplay' | 'leaderboard' | 'gameOver' | 'error';
  player: Player | null;
  gameStatus: GameStatus | null;
  currentQuestion: Question | null;
  leaderboard: Leaderboard | null;
  error: string | null;
  isLoading: boolean;
}
```

### Component State Models

#### CreatePlayer State
```typescript
interface CreatePlayerState {
  countries: Country[];
  filteredCountries: Country[];
  selectedCountry: string | null;
  searchTerm: string;
  isCreating: boolean;
}
```

#### Gameplay State
```typescript
interface GameplayState {
  question: Question | null;
  selectedAnswer: number | null;
  showFeedback: boolean;
  isSubmitting: boolean;
  skipsRemaining: number;
}
```

## User Interface Design

### Visual Theme Implementation

#### Color Scheme
- **Primary Background**: #0AA4FC with `uuundulate.svg` pattern
- **Card Background**: White with rounded corners
- **Button Style**: Black background, white uppercase text
- **Accent Color**: #0AA4FC (for radio buttons, search focus)
- **Feedback Colors**: Green (correct), Red (incorrect)

#### Typography
- **Font Family**: Rounded font (e.g., 'Nunito', 'Comfortaa', or similar)
- **Button Text**: Uppercase, bold, white
- **Question Text**: Medium weight, normal case, centered
- **Body Text**: Regular weight for lists and descriptions

#### Layout Structure
```css
.app-container {
  background: #0AA4FC url('public/uuundulate.svg');
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 16px;
  width: 90%;
  height: 90vh;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Component-Specific UI Design

#### Country Selection Interface
- Scrollable list with search functionality
- Each country item: flag (SVG) + name + radio button
- Search bar with accent color focus state
- Disabled create button until selection made

#### Gameplay Interface
- Header with skip counter and leaderboard button
- Centered question text
- Four answer buttons in grid layout
- Visual feedback: green/red button states
- Clean, minimal design focusing on readability

#### Leaderboard Interface
- Top 5 countries in ranked list format
- Separator line before player's country
- Progress bar for contribution percentage
- Consistent flag and country name display

## Error Handling

### Error Categories and Responses

#### Network Errors
- **Scenario**: API endpoint unreachable
- **Response**: "Connection error. Please check your internet and try again."
- **Action**: Retry button with exponential backoff

#### API Errors
- **Scenario**: Server returns error status
- **Response**: Display server-provided error message
- **Action**: Return to previous state or main menu

#### Validation Errors
- **Scenario**: Invalid user input
- **Response**: Inline validation messages
- **Action**: Highlight problematic fields, prevent submission

#### Game State Errors
- **Scenario**: Inconsistent game state
- **Response**: "Something went wrong. Restarting game..."
- **Action**: Reset to initial state, fetch fresh data

### Error Recovery Strategies

1. **Graceful Degradation**: Show cached data when possible
2. **Retry Logic**: Automatic retry for transient failures
3. **User Feedback**: Clear error messages with actionable steps
4. **State Recovery**: Preserve user progress when possible
5. **Fallback UI**: Alternative interfaces for error states

## Testing Strategy

### Unit Testing Approach

#### Component Testing
- **Tools**: React Testing Library, Jest
- **Focus Areas**:
  - Component rendering with various props
  - User interaction handling
  - State management logic
  - Error boundary behavior

#### API Service Testing
- **Tools**: Jest, MSW (Mock Service Worker)
- **Focus Areas**:
  - API call formatting and headers
  - Response parsing and error handling
  - Network failure scenarios
  - Data transformation logic

### Integration Testing

#### User Flow Testing
- **Complete Registration Flow**: Country selection → player creation → gameplay entry
- **Gameplay Flow**: Question display → answer selection → feedback → next question
- **Navigation Flow**: Gameplay ↔ leaderboard transitions
- **Error Recovery**: API failures → error display → recovery actions

#### API Integration Testing
- **Mock API Responses**: Test with various API response scenarios
- **Error Simulation**: Network failures, server errors, invalid responses
- **State Synchronization**: Ensure UI state matches API responses

### Performance Testing

#### Load Testing Considerations
- **Component Rendering**: Large country lists, rapid state changes
- **Memory Usage**: Prevent memory leaks in long gameplay sessions
- **API Call Optimization**: Debounced search, request caching
- **Bundle Size**: Optimize for mobile network conditions

## Implementation Considerations

### Technology Stack Integration

#### React Ecosystem
- **State Management**: React useState/useEffect hooks
- **Routing**: Conditional rendering based on app state
- **Styling**: CSS modules or styled-components for theme consistency
- **Icons**: React Icons library for UI elements

#### Third-Party Libraries
- **Country Flags**: `react-country-flag` or similar SVG flag library
- **HTTP Client**: Native fetch API with custom wrapper
- **Form Handling**: Custom validation logic
- **Progress Bars**: Custom CSS or lightweight progress component

### Performance Optimizations

#### Rendering Optimizations
- **Memoization**: React.memo for stable components
- **Lazy Loading**: Code splitting for different views
- **Virtual Scrolling**: For large country lists if needed
- **Debounced Search**: Prevent excessive filtering operations

#### Network Optimizations
- **Request Caching**: Cache static data like country lists
- **Optimistic Updates**: Show immediate feedback before API confirmation
- **Request Deduplication**: Prevent duplicate API calls
- **Offline Handling**: Graceful degradation when network unavailable

### Accessibility Considerations

#### Keyboard Navigation
- **Tab Order**: Logical navigation through interactive elements
- **Enter/Space**: Activate buttons and selections
- **Arrow Keys**: Navigate through country list and answer options
- **Escape**: Close modals or return to previous state

#### Screen Reader Support
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Live Regions**: Announce dynamic content changes
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Focus Management**: Clear focus indicators and logical flow

#### Visual Accessibility
- **Color Contrast**: Ensure sufficient contrast ratios
- **Font Sizing**: Scalable text for various screen sizes
- **Focus Indicators**: Clear visual focus states
- **Alternative Text**: Descriptive alt text for flag images