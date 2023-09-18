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
    };
  },

  methods: {
    initBoard() {
      // Paso 1: Generate an empty 9x9 board

      const newBoard = new Array(this.boardSize)
        .fill(null)
        .map(() => new Array(this.boardSize).fill(0));

      this.board = newBoard;
      this.fillDiagonalRegions();
    },

    fillDiagonalRegions() {
      for (let i = 0; i < this.boardSize; i += 3) {
        this.fillRegion(i, i);
      }
    },

    fillRegion(rowStart, colStart) {
      const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let index = 0;
      for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
          this.board[i][j] = numbers[index++];
        }
      }
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
