<template>
  <div id="game-bar">
    <p class="errors">ERRORS: {{ errorsCount }} / {{ MAX_ERRORS }}</p>
    <Timer
      :hasUserLost="hasUserLost"
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
    hasUserLost: { type: Boolean },
    isGameSolved: { type: Boolean },
    errorsCount: { type: Number },
    MAX_ERRORS: { type: Number },
    formattedTime: { type: String },
    time: { type: Number },
  },
};
</script>

<style lang="scss" scoped>
#game-bar {
  display: flex;
  * {
    color: #eaeaea;
  }
  .errors {
    margin-right: 1rem;
  }
}
</style>
