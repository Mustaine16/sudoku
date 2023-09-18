<template>
  <section id="board">
    <template v-for="(row, rowIndex) in board" :key="rowIndex + '-row'">
      <template
        v-for="(rowItem, columnIndex) in row"
        :key="columnIndex + '-column'"
      >
        <div>{{ rowItem }}</div>
      </template>
    </template>
  </section>
</template>

<script>
export default {
  name: "Board",
  props: {
    board: {
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
  gap: 1rem;
}
</style>
