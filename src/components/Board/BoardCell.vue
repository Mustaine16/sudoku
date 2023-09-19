<template>
  <input
    class="board-box"
    :class="getClass"
    :value="num ? num : ''"
    @input="
      (e) => {
        e.preventDefault();
        handleInput(e.target.value);
      }
    "
    type="number"
  />
</template>

<script>
export default {
  name: "BoardCell",
  props: {
    gameBoard: { type: Array },
    initialBoard: { type: Array },
    solvedBoard: { type: Array },
    num: { type: Number },
    row: { type: Array },
    rowIndex: { type: Number },
    columnIndex: { type: Number },
  },
  computed: {
    getClass() {
      return {
        "b-top": this.rowIndex === 0,
        "b-bottom":
          this.rowIndex === 2 || this.rowIndex === 5 || this.rowIndex === 8,
        "b-left": this.columnIndex == 0,
        "b-right":
          this.columnIndex == 2 ||
          this.columnIndex == 5 ||
          this.columnIndex == 8,
        disabled: !!this.initialBoard?.[this.rowIndex]?.[this.columnIndex],
      };
    },
  },
  methods: {
    handleInput(num) {
      const invalidChars = ["-", "+", "e"];
      const isEmpty = !this.gameBoard[this.rowIndex][this.columnIndex];
      console.log({ isEmpty });
      if (invalidChars.some((c) => c === num)) {
        return false;
      } else if (isEmpty) {
        this.$emit("boardInput", {
          num,
          row: his.rowIndex,
          col: this.columnIndex,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
