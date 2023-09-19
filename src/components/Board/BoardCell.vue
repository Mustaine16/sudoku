<template>
  <label class="board-box" :class="getClass">
    <input
      @focus="$emit('setActiveCell')"
      :value="num ? num : ''"
      @input="
        (e) => {
          e.preventDefault();
          handleInput(e.target.value);
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
        "is-equal": this.isEqualAsSelected,
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
      const correctCell = this.solvedBoard?.[this.rowIndex]?.[columnIndex];
      return this.num === correctCell;
    },

    isWrong() {
      return !this.isCorrect;
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
          row: this.rowIndex,
          col: this.columnIndex,
        });
      }
    },
    handleClear() {
      this.$emit("clearCell");
    },
  },
};
</script>

<style lang="scss" scoped>
.board-box {
  border: 1px solid grey;
  border-collapse: collapse;
  background: wheat;
  cursor: default;
  color: grey;
  padding: 0.75rem;
  position: relative;
  text-align: center;
  transition: all 0.2s;
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
    background: rgb(176, 176, 245);
  }
  &.is-equal {
    background: rgb(92, 92, 217);
  }
  &.active {
    background: rgb(62, 62, 186);
  }
  &.disabled {
    color: black;
  }

  &.is-correct {
    color: rgb(7, 7, 208);
  }
  &.is-correct {
    color: rgb(186, 12, 12);
    background: red;
  }

  &.b-top {
    border-top: 2px solid black;
  }
  &.b-bottom {
    border-bottom: 2px solid black;
  }
  &.b-left {
    border-left: 2px solid black;
  }
  &.b-right {
    border-right: 2px solid black;
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
