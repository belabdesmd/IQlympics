# Implementation Plan

- [x] 1. Set up shared types and data structures





  - Create comprehensive TypeScript interfaces for all data models
  - Define Country, Question, GameStatus, and Leaderboard types
  - Create API response wrapper types for consistent error handling
  - _Requirements: 1.1, 2.1, 3.1, 5.1_

- [x] 2. Implement country data and utilities








  - Create static country dataset with ISO codes, names, and flag emojis
  - Implement country search and filtering utilities
  - Add country lookup functions by code and name
  - _Requirements: 1.3, 1.4_

- [x] 3. Create core React components and hooks





- [x] 3.1 Build custom hooks for API communication


  - Implement usePlayer hook for player management
  - Create useGameplay hook for question and answer handling
  - Build useLeaderboard hook for ranking data
  - _Requirements: 1.1, 2.1, 3.1, 5.1_

- [x] 3.2 Create shared UI components


  - Build CountryListItem component with flag, name, and radio button
  - Implement QuestionCard component for displaying questions and options
  - Create ProgressBar component for contribution visualization
  - _Requirements: 1.3, 3.6, 5.5_

- [ ]* 3.3 Write unit tests for components and hooks
  - Test custom hooks with mock API responses
  - Test component rendering and user interactions
  - Test utility functions for country data
  - _Requirements: 1.1, 3.1, 5.1_

- [-] 4. Implement page components


- [x] 4.1 Create CountrySelectionPage

  - Build search bar with real-time filtering
  - Implement scrollable country list with radio selection
  - Add conditional "Pick" button with API integration
  - Handle player creation and navigation to gameplay
  - _Requirements: 1.3, 1.4, 1.5, 1.6_

- [x] 4.2 Build GameplayPage

  - Implement question display with 4 multiple-choice options
  - Add skip functionality with counter and API integration
  - Create progress tracking display (correct/total questions)
  - Handle answer validation and game over conditions
  - Add navigation to leaderboard page
  - _Requirements: 2.3, 3.1, 3.2, 3.3, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 4.3 Create LeaderboardPage

  - Display top 5 countries with positions, flags, and points
  - Show player's country position and ranking
  - Implement contribution progress bar with percentage
  - Add back navigation to gameplay page
  - _Requirements: 5.2, 5.3, 5.4, 5.5_

- [x] 4.4 Build GameOverPage and ErrorPage

  - Create full-screen red background game over state
  - Implement error state with appropriate messaging
  - Add game over image and descriptive text
  - _Requirements: 6.1, 6.2, 6.3, 7.1, 7.2, 7.3_

- [ ]* 4.5 Write integration tests for page components
  - Test complete user flows through each page
  - Test error handling and edge cases
  - Test responsive behavior on different screen sizes
  - _Requirements: 1.1, 3.1, 5.1, 6.1, 7.1_

- [x] 5. Implement server-side API endpoints





- [x] 5.1 Create gameplay endpoints


  - Implement GET /api/gameplay/question with question generation
  - Build POST /api/gameplay/answer with validation and scoring
  - Create GET /api/gameplay/skip with skip tracking
  - _Requirements: 2.2, 3.2, 3.3, 4.4, 4.5_

- [x] 5.2 Build status and leaderboard endpoints


  - Implement GET /api/status for game state retrieval
  - Create GET /api/leaderboard with country rankings and contributions
  - Add proper error handling and response formatting
  - _Requirements: 2.2, 5.2, 5.3, 5.4, 5.5_

- [x] 5.3 Enhance player management services


  - Extend existing PlayersServices for game state tracking
  - Add methods for skip counting and wrong answer tracking
  - Implement game over state management
  - _Requirements: 2.1, 4.1, 4.2, 6.1_

- [ ]* 5.4 Write API endpoint tests
  - Test all endpoints with various input scenarios
  - Test error conditions and edge cases
  - Test Redis data persistence and retrieval
  - _Requirements: 2.1, 3.1, 5.1_

- [x] 6. Implement styling and responsive design





- [x] 6.1 Create global styles and design system


  - Set up Tailwind CSS configuration for design system
  - Define color palette, typography, and spacing variables
  - Create utility classes for consistent styling
  - _Requirements: 8.2, 8.3, 8.4, 8.5_

- [x] 6.2 Style page components with mobile-first approach


  - Apply vibrant background images to all pages
  - Style centered white cards with border radius
  - Implement big, rounded, colored buttons with white text
  - Ensure responsive behavior across device sizes
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 6.3 Add visual assets and images


  - Source and optimize vibrant background images
  - Create or source game over and error state images
  - Add logo placeholder for gameplay page header
  - Optimize images for web performance
  - _Requirements: 6.2, 7.2, 8.1_

- [x] 7. Integrate routing and navigation




- [x] 7.1 Set up page routing system


  - Implement conditional rendering or React Router for navigation
  - Handle automatic routing based on player existence
  - Add navigation between gameplay and leaderboard pages
  - _Requirements: 1.1, 1.2, 2.1_

- [x] 7.2 Implement navigation logic


  - Add player existence check on app startup
  - Handle navigation from country selection to gameplay
  - Implement leaderboard navigation with back functionality
  - _Requirements: 1.1, 1.2, 5.1_

- [x] 8. Add error handling and loading states





- [x] 8.1 Implement comprehensive error handling


  - Add try-catch blocks for all API calls
  - Create user-friendly error messages for different failure types
  - Implement error state pages with recovery options
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 8.2 Add loading states and user feedback


  - Implement loading indicators for API calls
  - Add skeleton screens for data loading
  - Create smooth transitions between states
  - _Requirements: 2.1, 3.1, 5.1_

- [ ] 9. Final integration and testing
- [x] 9.1 Connect all components and test complete user flows




  - Test country selection to gameplay flow
  - Verify gameplay to leaderboard navigation
  - Test game over and error state transitions
  - Ensure all API endpoints work correctly with UI
  - _Requirements: 1.1, 2.1, 3.1, 5.1, 6.1, 7.1_

- [ ] 9.2 Optimize performance and accessibility
  - Implement code splitting for better load times
  - Add ARIA labels and semantic HTML for accessibility
  - Optimize images and assets for web performance
  - Test on various devices and screen sizes
  - _Requirements: 8.5_

- [ ]* 9.3 Conduct end-to-end testing
  - Test complete user journeys from start to finish
  - Verify error handling in real-world scenarios
  - Test performance under various network conditions
  - Validate accessibility compliance
  - _Requirements: 1.1, 3.1, 5.1, 7.1, 8.5_