<template>
  <main>
    <Board :board="board" />
    <UserControls />
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
      board: [],
      maxToFill: 0,
    };
  },

  methods: {
    initBoard() {
      // Paso 1: Generate an empty 9x9 board

      const newBoard = new Array(this.boardSize)
        .fill(null)
        .map(() => new Array(this.boardSize).fill(0));

      this.board = newBoard;
      this.autoFillBoard();
    },

    autoFillBoard() {
      for (
        let columnIndex = 0;
        columnIndex < this.boardSize;
        columnIndex += 3
      ) {
        for (let rowIndex = 0; rowIndex < this.boardSize; rowIndex += 3) {
          this.fillRegion(rowIndex, columnIndex);
        }
      }
    },

    fillRegion(rowStart, colStart) {
      const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      //Randomly, assign a max quantity of number to be filled in this region
      const maxToFill = 5;
      let filledCount = 0;

      let index = 0;

      for (let row = rowStart; row < rowStart + 3; row++) {
        for (let col = colStart; col < colStart + 3; col++) {
          const num = numbers[index];
          const randomBoolean = Math.random() < 0.75;

          if (
            this.isAllowed({ num, row, col }) &&
            filledCount < maxToFill &&
            randomBoolean
          ) {
            this.board[row][col] = num;
            filledCount++;
          }

          index++;
        }
      }
    },

    isAllowed({ num, row, col }) {
      return (
        this.isSafeInRow(num, row) &&
        this.isSafeInColumn(num, col) &&
        this.isSafeInRegion(
          num,
          Math.floor(row / 3) * 3,
          Math.floor(col / 3) * 3
        )
      );
    },

    isSafeInRow(num, row) {
      return !this.board[row].includes(num);
    },

    isSafeInColumn(num, col) {
      return !this.board.some((row) => row[col] === num);
    },

    isSafeInRegion(num, rowStart, colStart) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[rowStart + i][colStart + j] === num) {
            return false;
          }
        }
      }
      return true;
    },

    // Paso 5: Función para mezclar un arreglo aleatoriamente
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },

  mounted() {
    this.initBoard();
  },
};
</script>

<style scoped>
main {
  display: flex;
  gap: 1rem;
}
</style>
