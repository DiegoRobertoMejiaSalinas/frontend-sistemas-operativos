<template>
  <div class="wrapper-app-content" v-if="!!app">
    <div class="top-wrapper">
      <p @click="app = false">X</p>
    </div>
    <div class="center-content">
      <iframe
        style="width: 100%; height: 100%; overflow: hidden;"
        src="https://playpager.com/embed/checkers/index.html"
        scrolling="no"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    app: {
      get() {
        return this.$store.state.apps.checkers;
      },
      set(val) {
        this.$store.commit("apps/SET_CHECKERS", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-app-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 13;
  .top-wrapper {
    height: 35px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: $newdark;
    p {
      color: $white;
      cursor: pointer;
    }
  }
  .center-content {
    height: 90%;
  }
}
</style>
