<template>
  <div class="explorer-wrapper">
    <div class="outer-wrapper">
      <div class="action-bar">
        <div class="return-actions">
          <img v-if="folder.id != 1"
            @click="goBack"
            src="~@/assets/images/explorer/back.svg"
            alt=""
          />
        </div>
        <p class="name-explorer" v-if="folder">{{ folder.name }}</p>
        <div class="final-actions">
          <img
            class="close"
            src="~@/assets/images/explorer/close.svg"
            @click="closeExplorer"
            alt=""
          />
        </div>
      </div>
      <div
        @contextmenu.prevent.stop="handleClick($event, data)"
        class="content-explorer"
      >
        <div class="folder-wrapper" v-if="subfolders.length > 0">
          <Directory
            v-for="folder of subfolders"
            :key="folder.id"
            :data="folder"
          />
        </div>
      </div>
    </div>

    <vue-context
      :elementId="'explorerId'"
      :options="options"
      ref="vueSimpleContextMenu"
      @option-clicked="optionClicked"
    >
    </vue-context>
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

<script>
// graphql queries
import getDirectoryByFather from "~/apollo/QUERIES/Directory/getDirectoriesByFather.gql";
import getDirectoryById from "~/apollo/QUERIES/Directory/getDetailedDirectory.gql"

// Components Base
import Directory from "~/components/shared/directory.vue";
export default {
  data() {
    return {
      subfolders: [],
      options: [
        {
          name: "Crear Carpeta",
          slug: "mkdir",
        },
        {
          name: "Crear Archivo",
          slug: "vim",
        },
        {
          type: "divider",
        },
        {
          name: "Pegar",
          slug: "paste",
        },
      ],
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
    folder(val) {
      this.getFolders();
    },
  },
  methods: {
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      window.alert(JSON.stringify(event));
    },
    goBack() {
      // this.getFolders(this.folder.belongsTo.id);
      this.getFather(this.folder.belongsTo.id);
    },
    closeExplorer() {
      this.$store.dispatch("closeExplorer");
    },
    getFather(id) {
      this.$apollo
        .query({
          query: getDirectoryById,
          fetchPolicy: "network-only",
          variables: {
            input: id,
          },
        })
        .then((res) => {
          this.$store.dispatch("setFolder", res.data.directory)
        });
    },
    getFolders(id) {
      this.subfolders = [];
      this.$apollo
        .query({
          query: getDirectoryByFather,
          fetchPolicy: "network-only",
          variables: {
            input: id ? id : this.folder.id,
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