<template>
  <main>
    <section id="game-section">
      <GameBar
        :errorsCount="errorsCount"
        :formattedTime="formattedTime"
        :hasUserLost="hasUserLost"
        :isGameSolved="isGameSolved"
        :MAX_ERRORS="MAX_ERRORS"
        :time="time"
        @incrementTime="incrementTime"
      />
      <Board
        :gameBoard="gameBoard"
        :initialBoard="initialBoard"
        :solvedBoard="solvedBoard"
        :activeCell="activeCell"
        @boardInput="handleInput"
        @clearCell="handleClearCell"
        @setActiveCell="handleSetActiveCell"
        @cellError="addErrorCount"
      />
    </section>
    <UserControls @initGame="initGame" @numPadInput="handleNumPadInput" />

    <Teleport to="body">
      <CongratsModal
        :show="showModal && isGameSolved"
        :time="formattedTime"
        @close="showModal = false"
        @restartGame="restartGame"
        @initGame="initGame"
        :formattedTime="formattedTime"
      />
    </Teleport>
    <Teleport to="body">
      <ErrorModal
        :show="showModal && hasUserLost"
        @close="showModal = false"
        @restartGame="restartGame"
        @initGame="initGame"
        :formattedTime="formattedTime"
      />
    </Teleport>
  </main>
</template>

<script>
import { cloneDeep } from "lodash";
import { checkCellIsDisabled, getRegionStartAndEnd } from "./utils/index.js";
import CONSTANTS from "./utils/constants.js";
import Board from "@components/Board/Board.vue";
import GameBar from "@components/GameBar/GameBar.vue";
import CongratsModal from "@components/Modals/CongratsModal.vue";
import ErrorModal from "@components/Modals/ErrorModal.vue";
import UserControls from "@components/UserControls/UserControls.vue";
const NUMS_TO_DELETE = 60;

export default {
  components: {
    Board,
    CongratsModal,
    ErrorModal,
    GameBar,
    UserControls,
  },

  data() {
    return {
      activeCell: {
        row: null,
        column: null,
      },
      errorsCount: 0,
      initialBoard: [],
      gameBoard: [],
      maxToFill: 0,
      numsToDelete: NUMS_TO_DELETE,
      solvedBoard: [],
      showModal: false,
      time: 0,
      MAX_ERRORS: CONSTANTS.MAX_ERRORS,
      BOARD_SIZE: CONSTANTS.BOARD_SIZE,
    };
  },

  computed: {
    isGameSolved() {
      return this.solvedBoard.every((solvedRow, rowIndex) => {
        return solvedRow.every((solvedCell, solvedCellIndex) => {
          return solvedCell === this.gameBoard[rowIndex][solvedCellIndex];
        });
      });
    },

    hasUserLost() {
      return this.errorsCount === this.MAX_ERRORS;
    },

    formattedTime() {
      const m = Math.floor((this.time % 3600) / 60);
      const s = Math.floor((this.time % 3600) % 60);

      const mDisplay =
        m > 0 ? `${m.toString().length > 1 ? `${m}` : `${0}${m}`}` : "00";
      const sDisplay =
        s > 0 ? `${s.toString().length > 1 ? `${s}` : `${0}${s}`}` : "00";
      return `${mDisplay}:${sDisplay}`;
    },
  },

  methods: {
    initGame() {
      this.restartGameConfig();
      this.initSolvedBoard();
      this.setGameBoard();
    },

    restartGame() {
      this.restartGameConfig();
      this.gameBoard = cloneDeep(this.initialBoard);
    },

    restartGameConfig() {
      this.errorsCount = 0;
      this.activeCell = {
        row: null,
        col: null,
      };
      this.numsToDelete = NUMS_TO_DELETE;
      this.time = 0;
    },

    initSolvedBoard() {
      do {
        const newBoard = new Array(this.BOARD_SIZE)
          .fill(null)
          .map(() => new Array(this.BOARD_SIZE).fill(0));

        for (let rowIndex = 0; rowIndex < this.BOARD_SIZE; rowIndex++) {
          const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (
            let columnIndex = 0;
            columnIndex < this.BOARD_SIZE;
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

      for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
        const row = newBoard[rowIndex];

        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const randomBoolean = Math.random() >= 0.5;

          if (randomBoolean && this.numsToDelete) {
            newBoard[rowIndex][columnIndex] = 0;
            this.numsToDelete--;
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
      //Prevent user input when the modal is open
      if (this.showModal) return false;

      const isDisabled = checkCellIsDisabled({
        initialBoard: this.initialBoard,
        row,
        col,
      });

      if (!isDisabled) this.gameBoard[row][col] = Number(num);
    },

    handleNumPadInput(num) {
      if (this.activeCell.row !== null && this.activeCell.column !== null) {
        this.handleInput({
          row: this.activeCell.row,
          col: this.activeCell.col,
          num,
        });
      }
    },

    handleClearCell({ row, col }) {
      this.handleInput({ row, col, num: 0 });
    },

    handleSetActiveCell({ row, col, num }) {
      if (this.showModal) return false;

      this.activeCell = { row, col, num: Number(num) };
    },

    addErrorCount() {
      this.errorsCount = this.errorsCount + 1;
    },

    incrementTime() {
      this.time = this.time + 1;
    },
  },

  mounted() {
    this.initGame();
  },

  watch: {
    isGameSolved(isSolved) {
      if (isSolved) {
        this.showModal = true;
      }
    },

    hasUserLost(hasLost) {
      if (hasLost) this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  gap: 1rem;
}
</style>
