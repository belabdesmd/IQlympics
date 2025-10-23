I want to create the client side of this Devvit Web game. I have defined the endpoints (all that
start with api) and I need you to follow the flow I setup strictly.

# Overall Theme & Styling

- I want the svg `public/uuundulate.svg` to be the background image, with a background-color of
  #0AA4FC
- On top of the background, I want all pages/components to be in a white card, rounded radius,
  centered and a 90% height of the page
- I want all the buttons to be rounded, black background and the text within should be uppercase,
  white, bold.
- I want the font to be a rounded font.
- I want the icon buttons to be without background (only the icons), I want the icons to be flat,
  simple white.

# Pages/Components

When the app is first opened, I would like to check whether the player exists or not (calling
`api/player`) if the player is null then we should create a new player, if not then we start the
gameplay.

## Create Player Page/Component

The player goes here if he doesn't have an account, within the card it should have:

- A list of countries (scrollable, each country has a flag, name and a radio button)
- on top of the list, a search bar to search for and filter the countries
- on the bottom of the list, a button to create the player. The button should be disabled as long as
  the player hasn't picked a country yet.
- when clicked, call the endpoint `api/player/create`

For some extra details:

- the flag of a country should be a svg, use a dedicated library for country flags. The countries
  data are already set on the `/shared` directory.
- the accent color of the radio button and the focused search bar color should be like the
  background color.

## Gameplay Page/Component

Once we have a player either already saved or newly created, directly go to gameplay and fetch for
the status of the game calling the endpoint `/api/gameplay/status`. If the result has `gameover`
true then automatically go to GameOver, else continue the gameplay.

Within the card it should have:

- the question, medium font, not uppercase, centered
- the 4 options in buttons. When each of the components is clicked, check the answer (the picked
  option with the correctIndex), if it is correct then make that button background color to green,
  else red. Also, make an endpoint call to `/api/gameplay/answer`. If the return has `gameover` true
  then go to Gameover Component/Page, else update the question.

On top of the card, there should be:

- on the left side an icon button for skips, next to it (on the left) the number of skips left. If
  the number of skips left is 0 then the icon should be disabled. When the skip button is clicked
  then make a call to endpoint `api/gameplay/skip`, the return should have the next question.
- on the right side an icon button for leaderboard, clicking on it directs the user into the
  Leaderboard page/component.

## Leaderboard Page/Component

It should have within the card:

- Top 5 countries with their positions, flags, name and number of points
- then a separator then the player's country position, flag, name and points
- then below it a progress bar with the percentage of contribution of the player into their
  country's total points.

On top of the card, there should be only an icon button to go back to the gameplay. Leaderboard can
be fetched calling the endpoint `api/leaderboard`.

## Error Page/Component

If there's any error, either HTTP related or a return with status "error". Go to this Page/Component
where you show the error

## Gameover Page/Component

called only from the Gameplay, it only shows a message saying that you made 5 wrong answers and you
can play in this post again.

# Additional Points

- I don't want any changes in the api/server side.
- Do not over-complicate things.
