<template>
  <div id="game-bar">
    <p class="errors">ERRORS: {{ errorsCount }} / {{ MAX_ERRORS }}</p>
    <Timer
      :isGameSolved="isGameSolved"
      :formattedTime="formattedTime"
      :time="time"
      @incrementTime="$emit('incrementTime')"
    />
  </div>
</template>

<script>
import Timer from "./Timer.vue";
export default {
  components: { Timer },
  name: "GameBar",
  props: {
    isGameSolved: { type: Boolean },
    errorsCount: { type: Number },
    MAX_ERRORS: { type: Number },
    formattedTime: { type: String },
    time: { type: Number },
  },
};
</script>

<style lang="scss" scoped></style>
