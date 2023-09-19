<template>
  <section id="board">
    <template v-for="(row, rowIndex) in gameBoard" :key="rowIndex + '-row'">
      <template
        v-for="(num, columnIndex) in row"
        :key="rowIndex + 'row-' + columnIndex + '-column'"
      >
        <BoardCell
          :gameBoard="gameBoard"
          :initialBoard="initialBoard"
          :solvedBoard="solvedBoard"
          :num="num"
          :row="row"
          :rowIndex="rowIndex"
          :columnIndex="columnIndex"
          @boardInput="(data) => $emit('boardInput', data)"
        />
      </template>
    </template>
  </section>
</template>

<script>
import BoardCell from "@components/Board/BoardCell.vue";
export default {
  name: "Board",
  components: { BoardCell },
  props: {
    gameBoard: {
      type: Array,
    },
    initialBoard: {
      type: Array,
    },
    solvedBoard: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
#board {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
  place-items: center;
  width: 450px;
  height: 500px;

  .board-box {
    border: 1px solid grey;
    border-collapse: collapse;
    background: wheat;
    padding: 0.75rem;
    color: grey;
    text-align: center;
    height: 100%;
    width: 100%;

    &.disabled {
      color: black;
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
}
</style>
