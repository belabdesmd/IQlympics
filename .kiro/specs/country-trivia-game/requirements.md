# Requirements Document

## Introduction

A country-based trivia game built as a Devvit React application that runs on Reddit. Players select their country, answer trivia questions, and compete on a global leaderboard representing their chosen country. The game features a 3-page interface with country selection, gameplay, and leaderboard views.

## Glossary

- **Player**: A Reddit user who participates in the trivia game
- **Country Selection**: The process where a player chooses their representing country
- **Trivia Game**: The main gameplay where players answer multiple-choice questions
- **Leaderboard System**: A ranking system showing top-performing countries and individual contributions
- **Game Over State**: A terminal state when a player answers 5 questions incorrectly
- **Skip Feature**: A limited-use feature allowing players to bypass difficult questions
- **Country Data**: Information containing country code, name, and flag representation

## Requirements

### Requirement 1

**User Story:** As a new player, I want to select my country so that I can represent it in the trivia game

#### Acceptance Criteria

1. WHEN the application starts, THE Trivia Game SHALL check player existence via GET /api/player endpoint
2. IF no player exists, THEN THE Trivia Game SHALL display the country selection page
3. THE Trivia Game SHALL display a searchable list of countries with flags, names, and radio buttons
4. WHEN a player searches for a country name, THE Trivia Game SHALL filter the country list to show matching results
5. THE Trivia Game SHALL enable the "Pick" button only when a country is selected
6. WHEN the "Pick" button is clicked, THE Trivia Game SHALL call POST /api/player/create with the selected country code

### Requirement 2

**User Story:** As a registered player, I want to automatically access the gameplay so that I can start playing immediately

#### Acceptance Criteria

1. WHEN the application starts and a player exists, THE Trivia Game SHALL automatically route to the gameplay page
2. THE Trivia Game SHALL fetch player status via GET /api/status endpoint
3. THE Trivia Game SHALL fetch the first question via GET /api/gameplay/question endpoint
4. THE Trivia Game SHALL display the player's current game statistics including skips remaining

### Requirement 3

**User Story:** As a player, I want to answer trivia questions so that I can score points for my country

#### Acceptance Criteria

1. THE Trivia Game SHALL display questions with exactly 4 multiple-choice options
2. WHEN a player selects an answer option, THE Trivia Game SHALL validate the answer against the correct index
3. THE Trivia Game SHALL call POST /api/gameplay/answer with the boolean result of the answer validation
4. IF the answer endpoint returns false, THEN THE Trivia Game SHALL trigger game over state
5. IF the answer endpoint returns true, THEN THE Trivia Game SHALL update the questions counter and fetch the next question
6. THE Trivia Game SHALL display a counter showing correctly answered questions versus total questions asked

### Requirement 4

**User Story:** As a player, I want to skip difficult questions so that I can continue playing when stuck

#### Acceptance Criteria

1. THE Trivia Game SHALL provide players with a maximum of 3 skips per game session
2. THE Trivia Game SHALL display the number of remaining skips based on status data
3. WHEN skips remaining equals zero, THE Trivia Game SHALL disable the skip button
4. WHEN the skip button is clicked, THE Trivia Game SHALL call GET /api/gameplay/skip endpoint
5. THE Trivia Game SHALL decrement the displayed skip count after successful skip

### Requirement 5

**User Story:** As a player, I want to view the leaderboard so that I can see how my country ranks globally

#### Acceptance Criteria

1. WHEN the leaderboard button is clicked, THE Trivia Game SHALL navigate to the leaderboard page
2. THE Trivia Game SHALL fetch leaderboard data via GET /api/leaderboard endpoint
3. THE Trivia Game SHALL display the top 5 countries with positions, flags, names, and points
4. THE Trivia Game SHALL show the player's country position and ranking separately
5. THE Trivia Game SHALL display a progress bar showing the player's contribution percentage to their country's total points

### Requirement 6

**User Story:** As a player, I want to see a game over screen when I fail so that I understand why I cannot continue playing

#### Acceptance Criteria

1. WHEN a player answers 5 questions incorrectly, THE Trivia Game SHALL display the game over state
2. THE Trivia Game SHALL show a full red background with a game over image
3. THE Trivia Game SHALL display the message "you answered wrong 5 times in this post, you can't play anymore"
4. WHEN game over status is true from any endpoint, THE Trivia Game SHALL prevent further gameplay

### Requirement 7

**User Story:** As a player, I want to see clear error messages when something goes wrong so that I understand what happened

#### Acceptance Criteria

1. WHEN any API endpoint call fails, THE Trivia Game SHALL display an error state
2. THE Trivia Game SHALL show a red background with an error image
3. THE Trivia Game SHALL display appropriate error text below the error image
4. THE Trivia Game SHALL handle network failures gracefully without crashing

### Requirement 8

**User Story:** As a player, I want an attractive and mobile-friendly interface so that I can enjoy playing on any device

#### Acceptance Criteria

1. THE Trivia Game SHALL display vibrant background images on all pages
2. THE Trivia Game SHALL center content in cards with white backgrounds and border radius
3. THE Trivia Game SHALL use big, rounded, colored buttons with white text
4. THE Trivia Game SHALL display text in bold, uppercase format with rounded fonts
5. THE Trivia Game SHALL ensure responsive design for mobile and desktop devices