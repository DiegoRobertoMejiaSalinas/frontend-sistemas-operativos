<template>
  <div class="wrapper-app-content" v-if="!!app">
    <div class="top-wrapper">
      <p @click="app = false">X</p>
    </div>
    <div class="center-content">
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Universidad%20San%20Marcos&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    app: {
      get() {
        return this.$store.state.apps.maps;
      },
      set(val) {
        this.$store.commit("apps/SET_MAPS", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 100%;
  width: 100%;
}
.mapouter {
  position: relative;
  text-align: right;
  height: 100%;
  width: 100%;
}
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
