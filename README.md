# Description of folders and files.

## /src/App.vue

This is the main component. Here we manage the whole Game state, such initial board, the solution, and handle all the multiple events of the game.

## /src/components/Board

- `Board.vue`: Generate the game board.
- `BoardCell.vue`: Child of Boar.vue, it represents each board cell, and trigger the user inputs. Also it manage its correct/wrong state view.

## /src/components/GameBar

- `GameBar.vue`: It contains the errors count.
- `Timer.vue`: It contains the count timer.

## /src/components/Modals

- `CongratsModal.vue`: Shows up when the user wins the game.
- `ErrorsModal.vue`: Shows up when the user lose the game.

## /src/components/UserControls

- `UserControls.vue`: It contains the Numpad and also a "New Game" button.
- `NumberButton.vue`: Represents each number input inside Numpad.

## /src/Utils

- `constants.js`: Constants for the project.
- `index.js`: It contains some helpers.

## /src/assets

Here I just have 2 icons for the modal.
