<template>
  <div class="explorer-wrapper">
    <div class="outer-wrapper">
      <div class="action-bar">
        <div></div>
        <p class="name-explorer" v-if="folder">{{ folder.name }}</p>
        <div class="final-actions">
          <p class="close" @click="closeExplorer">X</p>
        </div>
      </div>
      <div class="content-explorer">
        <div class="folder-wrapper" v-if="subfolders.length > 0">
          <Directory
            v-for="folder of subfolders"
            :key="folder.id"
            :data="folder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

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
      .name-explorer {
        font-weight: bold;
        color: $white;
        letter-spacing: 2px;
      }
      .final-actions {
        p {
          color: $white;
          padding: 0 10px;
          &.close {
            cursor: pointer;
          }
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

<script>
// graphql queries
import getDirectoryByFather from "~/apollo/QUERIES/Directory/getDirectoriesByFather.gql";

// Components Base
import Directory from "~/components/shared/directory.vue";
export default {
  data() {
    return {
      subfolders: [],
    };
  },
  computed: {
    folder() {
      return this.$store.state.activeFolder;
    },
  },
  mounted() {
    if (this.folder) {
      this.getFolders();
    }
  },
  watch: {
    folder(val){
      this.getFolders()
    }
  },
  methods: {
    closeExplorer() {
      this.$store.dispatch("closeExplorer");
    },
    getFolders() {
      this.subfolders= []
      this.$apollo
        .query({
          query: getDirectoryByFather,
          fetchPolicy: 'network-only',
          variables: {
            input: this.folder.id,
          },
        })
        .then((res) => {
          for (let directory of res.data.directories) {
            this.subfolders.push(directory);
          }
        });
    },
  },
};
</script>