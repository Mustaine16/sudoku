<template>
  <section id="board">
    <template v-for="(row, rowIndex) in board" :key="rowIndex + '-row'">
      <template
        v-for="(rowItem, columnIndex) in row"
        :key="columnIndex + '-column'"
      >
        <input
          class="board-box"
          :class="getClass(rowIndex, columnIndex)"
          :value="rowItem ? rowItem : ''"
          type="number"
        />
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
  methods: {
    getClass(row, column) {
      return {
        "b-top": row === 0,
        "b-bottom": row === 2 || row === 5 || row === 8,
        "b-left": column == 0,
        "b-right": column == 2 || column == 5 || column == 8,
      };
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
    color: black;
    text-align: center;
    height: 100%;
    width: 100%;

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
