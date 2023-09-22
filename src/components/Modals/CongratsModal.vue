<template>
  <Modal
    :iconName="'trophy'"
    @restartGame="$emit('restartGame')"
    @initGame="$emit('initGame')"
  >
    <template #text-container>
      <h2>Congrats!</h2>
      <p>You completed the Sudoku in {{ time }}.</p>
      <p>Would you like to play again?</p>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  name: "CongratsModal",
  components: { Modal },
  props: {
    time: { type: String },
  },
};
</script>

<style></style>
