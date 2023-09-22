<template>
  <section id="user-controls">
    <article id="number-buttons-container">
      <button
        v-for="(n, index) in numbers"
        :key="index + '-nb'"
        class="number-button"
        @click="$emit('numPadInput', n)"
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

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

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
      transition: background-color 0.2s;
      padding: 0;
      height: 5rem;
      width: 5rem;

      &:hover {
        background: #070707;
        color: white;
      }

      &:active {
        background: #d6d6d6;
        color: black;
      }
    }

    @media screen and (max-width: 1024px) {
      display: flex;
      justify-content: center;
      button {
        height: 4rem;
        width: 4rem;
      }
    }

    @media screen and (max-width: 768px) {
      button {
        height: 3rem;
        width: 3rem;
      }
    }
    @media screen and (max-width: 425px) {
      button {
        height: 2.25rem;
        width: 2.25rem;
      }
    }
  }

  #init-game {
    background: #eaeaea;
    color: black;
    font-size: 1.5rem;

    &:hover {
      background: #070707;
      color: white;
    }

    &:active {
      background: #5dd39e;
      color: white;
    }

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
}
</style>
