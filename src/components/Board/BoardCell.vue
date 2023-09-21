<template>
  <label class="board-box" :class="getClass">
    <input
      @focus="$emit('setActiveCell')"
      :value="num ? num : ''"
      @input="
        (e) => {
          e.preventDefault();
          handleInput(e.data);
        }
      "
      @keyup.delete="handleClear"
      type="number"
    />
    <span>{{ num ? num : "" }}</span>
  </label>
</template>

<script>
import { getRegionStartAndEnd } from "../../utils/index.js";

export default {
  name: "BoardCell",
  props: {
    activeCell: { type: Object },
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
        active: this.isActive,
        "in-row": this.isInActiveRow,
        "in-column": this.isInActiveColumn,
        "in-region": this.isInRegion,
        "is-correct": this.isCorrect,
        "is-wrong": this.isWrong,
        "is-equal": this.isEqualAsSelected,

        "b-top": this.rowIndex === 0,
        "b-bottom":
          this.rowIndex === 2 || this.rowIndex === 5 || this.rowIndex === 8,
        "b-left": this.columnIndex == 0,
        "b-right":
          this.columnIndex == 2 ||
          this.columnIndex == 5 ||
          this.columnIndex == 8,

        "c-top-left": this.rowIndex === 0 && this.columnIndex === 0,
        "c-top-right": this.rowIndex === 0 && this.columnIndex === 8,
        "c-bottom-left": this.rowIndex === 8 && this.columnIndex === 0,
        "c-bottom-right": this.rowIndex === 8 && this.columnIndex === 8,
        disabled: this.isDisabled,
      };
    },

    isActive() {
      return (
        this.rowIndex === this.activeCell.row &&
        this.columnIndex === this.activeCell.col
      );
    },

    isInActiveRow() {
      return this.rowIndex === this.activeCell.row;
    },

    isInActiveColumn() {
      return this.columnIndex === this.activeCell.col;
    },

    isEqualAsSelected() {
      return this.num && this.num === this.activeCell.num;
    },

    isDisabled() {
      return !!this.initialBoard?.[this.rowIndex]?.[this.columnIndex];
    },

    isInRegion() {
      const { rowStart, rowEnd, colStart, colEnd } = getRegionStartAndEnd({
        row: this.activeCell.row,
        col: this.activeCell.col,
      });

      const rowBelongsToActiveRegion =
        this.rowIndex >= rowStart && this.rowIndex <= rowEnd;
      const columnBelongsToActiveRegion =
        this.columnIndex >= colStart && this.columnIndex <= colEnd;

      return rowBelongsToActiveRegion && columnBelongsToActiveRegion;
    },

    isCorrect() {
      const correctCell = this.solvedBoard?.[this.rowIndex]?.[this.columnIndex];
      return this.num === correctCell && !this.isDisabled;
    },

    isWrong() {
      return this.num && !this.isDisabled && !this.isCorrect;
    },
  },
  methods: {
    handleInput(num) {
      const invalidChars = ["-", "+", "e"];

      if (invalidChars.some((c) => c === num) || this.isDisabled) {
        return false;
      } else {
        this.$emit("boardInput", {
          num,
          row: this.rowIndex,
          col: this.columnIndex,
        });

        this.$nextTick(() => {
          this.$emit("setActiveCell");
        });
      }
    },
    handleClear() {
      this.$emit("clearCell");
      this.$emit("setActiveCell");
    },
  },
};
</script>

<style lang="scss" scoped>
.board-box {
  border: 1px solid #7e7f9a;
  border-collapse: collapse;
  background: #232c33;
  cursor: default;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  position: relative;
  text-align: center;
  transition: background ease-out 0.075s;
  height: 100%;
  width: 100%;

  input {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &:focus-within,
  &.in-row,
  &.in-column,
  &.in-region {
    background: #080808;
  }
  &.is-equal {
    background: #626c79;
  }
  &.active {
    background: #597495;
  }
  &.disabled {
    color: white;
  }

  &.is-correct {
    color: #5dd39e;
  }
  &.is-wrong {
    color: #c84630;
    background: #d4a0a7;
  }

  &.b-top {
    border-top: 2px solid #eaeaea;
  }
  &.b-bottom {
    border-bottom: 2px solid #eaeaea;
  }
  &.b-left {
    border-left: 2px solid #eaeaea;
  }
  &.b-right {
    border-right: 2px solid #eaeaea;
  }

  &.c-top-left {
    border-radius: 5px 0 0 0;
  }
  &.c-top-right {
    border-radius: 0 5px 0 0;
  }
  &.c-bottom-left {
    border-radius: 0 0 0 5px;
  }
  &.c-bottom-right {
    border-radius: 0 0 5px 0;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
