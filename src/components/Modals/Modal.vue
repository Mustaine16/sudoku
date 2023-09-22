<template>
  <Transition name="modal">
    <div v-if="show" class="modal-bckg">
      <div class="modal-container">
        <div class="modal-body">
          <img :src="`${image}`" />

          <div class="text-container">
            <slot name="text-container"></slot>
          </div>

          <div class="footer">
            <button id="restart-game" @click="$emit('restartGame')">
              Restart
            </button>
            <button id="new-game" @click="$emit('initGame')">New Game</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean },
    iconName: { type: String },
  },
  computed: {
    image() {
      return (
        this.iconName &&
        new URL(`../../assets/${this.iconName}.png`, import.meta.url).href
      );
    },
  },
};
</script>

<style lang="scss">
.modal-bckg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.2s ease-in;
  z-index: 9999;
}

.modal-container {
  width: 50%;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease-in;

  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
      width: 3rem;
      height: auto;
    }
    .footer {
      display: flex;
      justify-content: space-around;
      margin-top: 2rem;
      width: 100%;

      button {
        &#restart-game {
          background: #c84630;
          color: white;
          &:hover {
            background: #b9361f;
          }

          &:active {
            background: #882f1f;
          }
          
        }
        &#new-game {
          background: #38b77d;
          color: white;

          &:hover {
            background: #34996c;
          }

          &:active {
            background: #207750;
          }
        }
      }
    }
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
