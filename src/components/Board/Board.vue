<template>
  <section id="board">
    <template v-for="(row, rowIndex) in gameBoard" :key="rowIndex + '-row'">
      <template
        v-for="(num, columnIndex) in row"
        :key="rowIndex + 'row-' + columnIndex + '-column'"
      >
        <BoardCell
          :activeCell="activeCell"
          :gameBoard="gameBoard"
          :initialBoard="initialBoard"
          :solvedBoard="solvedBoard"
          :num="num"
          :row="row"
          :rowIndex="rowIndex"
          :columnIndex="columnIndex"
          @boardInput="(data) => $emit('boardInput', data)"
          @clearCell="
            () => $emit('clearCell', { row: rowIndex, col: columnIndex })
          "
          @setActiveCell="
            (numFromInput) =>
              $emit('setActiveCell', {
                row: rowIndex,
                col: columnIndex,
                num: numFromInput || num,
              })
          "
          @cellError="$emit('cellError')"
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
    activeCell: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
#board {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
  justify-content: center;
  width: 500px;
  height: 500px;

  @media screen and (max-width: 1024px) {
    grid-template-rows: repeat(9, 4.5rem);
    grid-template-columns: repeat(9, 4.5rem);
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(9, 11%);
    grid-template-columns: repeat(9, 11%);
  }
}
</style>
