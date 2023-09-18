<template>
  <section id="number-buttons-container">
    <button
      v-for="(n, index) in numbers"
      :key="index + '-nb'"
      class="number-button"
    >
      {{ n }}
    </button>
  </section>
</template>

<script>
import NumberButton from "@components/UserControls/NumberButton.vue";
export default {
  name: "UserControls",
  components: {
    NumberButton,
  },
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
};
</script>

<style lang="scss" scoped>
#number-buttons-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.1rem;
}
</style>
