<template>
  <Modal
    :iconName="'error'"
    @restartGame="$emit('restartGame')"
    @initGame="$emit('initGame')"
  >
    <template #text-container>
      <h2>Ups, you lost!</h2>
      <p>You have reached out the maximum of errors, try again!</p>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  name: "ErrorModal",
  components: { Modal },
};
</script>

<style></style>
