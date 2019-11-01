# COMP 4711 Individual Assignment

Please mention the URL of your hosted assignment at the comments section
before hitting submit

As for your individual project, please implement this Memory game as seen in this video, except
1. number of trials is unlimited
2. Minimum matrix size is 5x5
3. to terminate the game either user's score gets down to 0 or negative, or the user presses
"Terminate".
4. each time the user clicks on wrong button loses 1 score , each time clicks the correct tile,
gets +1 scores ( the rest of scoring logic is the same as seen in video)

[https://www.youtube.com/watch?v=uNinYFJEAIM](https://www.youtube.com/watch?v=uNinYFJEAIM)

This game challenges users to track a pattern as it rotates!

This game is good for improving sense of direction

In Memory Game, the user needs to quickly memorize a group of tiles on a grid. That means
remembering their location, and maybe even the shapes they create.

The game "challenges a part of your short-term memory called spatial recall — your ability to
track location and position within an environment".

The game is of type Dynamic game difficulty balancing (adapts with the user skill and gets
harder or easier with respect to the user ability)

If wrong tiles are pressed the next matrix gets generated with lower number of tiles, or smaller
size (a 5X5 matrix with 6 tiles, will turn to a 5X5 matrix with 5 tiles or 5X4 matrix with 6 tiles)

if the user successfully clicked all the tiles then the game becomes one step more difficult (a 5X5
matrix with 6 tiles, will turn to a 5X5 matrix with 7 tiles or 6X5 matrix with 6 tiles)

## Score calculation

Each time the user clicks on wrong button loses 1 score, each time clicks the correct tile, gets +1
scores (the rest of scoring logic is the same as seen in video)

## Termination of the game

To terminate the game either user's score gets down to 0 or negative, or the user presses
"Terminate" button

Note: Upon pressing Terminate, get confirmation from user (as it might have been pressed
accidentally) e.g. Are you sure you want to terminate?

Upon termination, display a summary page, `summary.html`, with
- a button which reads RESTART
- Pressing this button will restart the game
- a text input (to get user's name) with a submit button underneath it.
- The user enters name and presses submit.
- Pressing submit button will store the obtained score and the entered name in db.
- As well, pressing submit button displays the leaderboard page, `leaderboard.html`, listing top 5
players and their scores. At the top of leaderboard page, current user's name and obtained score
and rank appears. At the button, place a RESTART button to restart the game if user wants.

## Learning outcomes

- JavaScript, Recursion, MVC, DB, Node js, dynamic user interaction, Asynchronous
programming, event driven programming.

## Marking Breakdown

* A (8/10) Correct bug free application just like introduced in the video
    * Correct implementation of the game with all functionalities (7 marks)
        * (5 marks) logic of the game
        * (1 mark) has to be visible to user that the matrix rotated
        * (0.5 mark) playing audio when refreshing the matrix. just like in video
        * (0.5 mark) DB ( MySQL/MongoDB)
    * Leaderboard (1 mark)
        * fetching scores and displaying the top 5
* Student will be considered for B and C, if A gets score of at least 5/10
* B(1/10) MVC pattern has been followed
* C(1/10) Correct coding style
    * Clean and modular code by declaring objects and functions.
    * Separated css/html views/js.
    * Use of correct variable scoping. i. e. If a variable is not supposed to be global, do not declare it global.
    * Use of objects when needed.
    * Chose let and const, over var. In fact you do not need var, so your code has to be “var” free!
    * Do not use hard coded strings in your code. Move them all in a separate file and define const string variables and use those variables in your code
    * Separation of concerns: each function is responsible to deliver one single simple task, not more. ( more in next page)
    * arrow functions are preferred ( not a must)

## Deliverable

1. zip everything in lastNameMemory.zip
2. URL where the memory game is hosted

* Deductions:
* -2 marks if the game is not hosted
* Warning! Do not share any part of your code with your friends. You and your friends
will both get 0 for this assignment. If happens again, you both get 0 for the course!
* 0.25 mark deduction for each hour late submission
