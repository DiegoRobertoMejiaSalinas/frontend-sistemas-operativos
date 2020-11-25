<template>
  <div class="editor-wrapper">
    <div class="action-bar">
      <div></div>
      <div class="name-wrapper">{{message}}</div>
      <div class="final-actions">
        <img
          class="close"
          src="~@/assets/images/explorer/close.svg"
          @click="closeExplorer"
          alt=""
        />
      </div>
    </div>
    <div class="content-wrapper">
      <div class="inner-content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  position: absolute;
  width: 450px;
  height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: 0.3s ease-in-out;
  -webkit-box-shadow: 2px 6px 27px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 6px 27px -3px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 6px 27px -3px rgba(0, 0, 0, 0.75);
  .action-bar {
    position: absolute;
    height: 30px;
    background-color: $dark-bg;
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .name-wrapper {
      font-weight: bold;
      color: $white;
      letter-spacing: 2px;
    }
    .final-actions {
      display: flex;
      align-items: center;
      img {
        width: 10px;
        cursor: pointer;
      }
    }
  }
  .content-wrapper {
    max-width: 100%;
    height: 100%;
    background-color: $dark;

    .inner-content-wrapper {
      padding: 60px;
    }
  }
}
</style>

<script>
export default {
  computed: {
    editor() {
      return this.$store.state.editor.folderToModify;
    },
    message(){
        return this.$store.state.editor.typeEditor
    }
  },
  methods: {
      closeExplorer(){
          this.$store.dispatch("editor/closeEditor")
      }
  }
};
</script>