<template>
  <p>{{ formattedTime }}</p>
</template>

<script>
export default {
  anme: "Timer",

  props: {
    formattedTime: { type: String },
    isGameSolved: { type: Boolean },
    time: { type: Number },
  },

  data() {
    return {
      interval: null,
    };
  },

  methods: {
    toggleTimer() {
      if (!this.isGameSolved) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.incrementTime, 1000);
      }
    },
    incrementTime() {
      this.$emit("incrementTime");
    },
  },

  mounted() {
    this.toggleTimer();
  },

  watch: {
    isGameSolved(isSolved) {
      if (isSolved) {
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<style></style>
