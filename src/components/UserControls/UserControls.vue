<template>
  <section id="user-controls">
    <article id="number-buttons-container">
      <button
        v-for="(n, index) in numbers"
        :key="index + '-nb'"
        class="number-button"
      >
        {{ n }}
      </button>
    </article>
    <button id="init-game" @click="$emit('initGame')">New Game</button>
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
#user-controls {
  display: flex;
  flex-direction: column;
  #number-buttons-container {
    display: grid;
    grid-template-columns: repeat(3, 5rem);
    grid-template-rows: repeat(3, 5rem);
    grid-gap: 0.25rem 0.35rem;
    background: #ffffff08;
    box-shadow: 1px 1px 1px 2px #0000000d;
    padding: 0.25rem;
    padding-bottom: 0;
    margin-top: auto;
    margin-bottom: 1rem;
    height: fit-content;

    button {
      background: #626c79;
      border-radius: 3px !important;
      color: #eaeaea;
      border-radius: 5px;
      font-size: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  #init-game {
    background: #eaeaea;
    color: black;
    font-size: 1.5rem;
  }
}
</style>
