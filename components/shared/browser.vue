<template>
  <div class="explorer-wrapper">
    <div class="outer-wrapper">
      <div class="action-bar">
        <div class="return-actions"></div>
        <p class="name-explorer">NAVEGADOR WEB</p>
        <div class="final-actions">
          <img
            class="close"
            src="~@/assets/images/explorer/close.svg"
            @click="closeExplorer"
            alt=""
          />
        </div>
      </div>
      <div class="content-explorer">
          <input type="text" value="https://www.amazon.co.uk/&output=embed" class="frmUrlVal" ID="URL">
        <iframe
          align="center"
          width="100%"
          height="100%"
          src="https://www.amazon.co.uk/&output=embed"
          frameborder="yes"
          scrolling="yes"
          name="myIframe"
          id="myIframe"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.LoadPage();
  },
  methods: {
    LoadPage() {
      let objFrame = document.getElementById("myIframe");
      console.log(objFrame);
      objFrame.src = document.getElementById("URL").value;
    }
  }
};
</script>

<style lang="scss" scoped>
.explorer-wrapper {
  position: absolute;
  width: 100% !important;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 66;
  transition: 0.3s ease-in-out;
  .outer-wrapper {
    max-width: 100%;
    height: 100%;

    .action-bar {
      position: absolute;
      height: 40px;
      background-color: $dark-bg;
      width: 100% !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      .return-actions {
        display: flex;
        align-items: center;
        img {
          cursor: pointer;
          width: 20px;
        }
      }
      .name-explorer {
        font-weight: bold;
        color: $white;
        letter-spacing: 2px;
      }
      .final-actions {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          cursor: pointer;
        }
      }
    }
    .content-explorer {
      max-width: 100%;
      height: 100%;
      background-color: $dark;

      .folder-wrapper {
        padding: 60px;
      }
    }
  }
}
</style>
