<template>
  <p>{{ formattedTime }}</p>
</template>

<script>
export default {
  anme: "Timer",

  props: {
    formattedTime: { type: String },
    hasUserLost: { type: Boolean },
    isGameSolved: { type: Boolean },
    time: { type: Number },
  },

  data() {
    return {
      interval: null,
    };
  },

  methods: {
    setTimer() {
      clearInterval(this.interval);
      this.interval = setInterval(this.incrementTime, 1000);
    },
    incrementTime() {
      this.$emit("incrementTime");
    },
  },

  mounted() {
    this.setTimer();
  },

  watch: {
    isGameSolved(isSolved) {
      if (isSolved) {
        clearInterval(this.interval);
      } else if (!this.interval) {
        //Restart the game
        this.setTimer();
      }
    },

    time(newTime, prevTime) {
      //When the user restarts the game
      if (newTime === 0 && prevTime > 0) {
        this.setTimer();
      }
    },

    hasUserLost(hasLost) {
      if (hasLost) {
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<style></style>
