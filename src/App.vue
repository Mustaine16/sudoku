<template>
  <main>
    <Board
      :gameBoard="gameBoard"
      :initialBoard="initialBoard"
      :solvedBoard="solvedBoard"
      :activeCell="activeCell"
      @boardInput="handleInput"
      @clearCell="handleClearCell"
      @setActiveCell="handleSetActiveCell"
    />
    <UserControls @initGame="initGame" />
  </main>
</template>

<script>
import { cloneDeep } from "lodash";
import { getRegionStartAndEnd } from "./utils/index.js";
import Board from "@components/Board/Board.vue";
import UserControls from "@components/UserControls/UserControls.vue";

export default {
  components: {
    Board,
    UserControls,
  },

  data() {
    return {
      boardSize: 9,
      solvedBoard: [],
      initialBoard: [],
      gameBoard: [],
      maxToFill: 0,
      activeCell: {},
    };
  },

  methods: {
    initGame() {
      this.initSolvedBoard();
      this.setGameBoard();
    },
    initSolvedBoard() {
      do {
        const newBoard = new Array(this.boardSize)
          .fill(null)
          .map(() => new Array(this.boardSize).fill(0));

        for (let rowIndex = 0; rowIndex < this.boardSize; rowIndex++) {
          const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (
            let columnIndex = 0;
            columnIndex < this.boardSize;
            columnIndex++
          ) {
            const numFind = numbers.find((num) => {
              return this.isAllowed({
                board: newBoard,
                num,
                row: rowIndex,
                col: columnIndex,
              });
            });

            newBoard[rowIndex][columnIndex] = numFind;
          }
        }

        this.solvedBoard = newBoard;
      } while (!this.solvedBoard.every((row) => row.every((num) => !!num)));
    },

    setGameBoard() {
      const newBoard = cloneDeep(this.solvedBoard);

      let numsToDelete = 60;

      for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
        const row = newBoard[rowIndex];

        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const randomBoolean = Math.random() >= 0.5;

          if (randomBoolean && numsToDelete) {
            newBoard[rowIndex][columnIndex] = 0;
            numsToDelete--;
          }
        }
      }

      this.gameBoard = cloneDeep(newBoard);
      this.initialBoard = cloneDeep(newBoard);
    },

    isAllowed({ board, num, row, col }) {
      return (
        this.isAllowedInRow({ board, num, row }) &&
        this.isAllowedInColumn({ board, num, col }) &&
        this.isAllowedInRegion({ board, num, row, col })
      );
    },

    isAllowedInRow({ board, num, row }) {
      return !board[row].includes(num);
    },

    isAllowedInColumn({ board, num, col }) {
      return !board.some((row) => row[col] === num);
    },

    isAllowedInRegion({ board, num, row, col }) {
      //Check if the num is not present in the 3x3 box
      const { rowStart, rowEnd, colStart, colEnd } = getRegionStartAndEnd({
        row,
        col,
      });

      const numsInRegion = board
        .slice(rowStart, rowEnd + 1)
        .flatMap((row) => row.slice(colStart, colEnd + 1));

      return !numsInRegion.some((n) => n === num);
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    handleInput({ num, row, col }) {
      this.gameBoard[row][col] = Number(num);
    },

    handleClearCell({ row, col }) {
      this.gameBoard[row][col] = 0;
    },

    handleSetActiveCell({ row, col, num }) {
      this.activeCell = { row, col, num };
    },
  },

  mounted() {
    this.initGame();
  },
};
</script>

<style scoped>
main {
  display: flex;
  gap: 1rem;
}
</style>
