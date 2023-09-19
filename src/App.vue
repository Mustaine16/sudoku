<template>
  <main>
    <Board :board="solvedBoard" />
    <UserControls />
    <button @click="initSolvedBoard">FILL</button>
  </main>
</template>

<script>
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
      maxToFill: 0,
      currentFocus: [0, 0],
    };
  },

  methods: {
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
      const rowStart = 3 * Math.floor(row / 3);
      const rowEnd = rowStart + 2;
      const colStart = 3 * Math.floor(col / 3);
      const colEnd = colStart + 2;

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
  },

  mounted() {
    this.initSolvedBoard();
    // this.setGameBoard();
  },
};
</script>

<style scoped>
main {
  display: flex;
  gap: 1rem;
}
</style>
