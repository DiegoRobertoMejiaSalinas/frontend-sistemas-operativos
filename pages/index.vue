<template>
  <div class="wrapper" @contextmenu.prevent.stop="handleClick($event)">
    <div class="background">
      <img src="~@/assets/images/desktop/background.jpg" alt="" />
    </div>
    <div class="inner-wrapper">
      <Directory v-for="folder of folders" :key="folder.id" :data="folder" />
      <File v-for="file of files" :key="file.id" :data="file" />
      <Explorer ref="explorer" v-if="!!explorerOpen" />
      <ModifyFolder @refresh="refresh" v-if="!!editorOpen" />

      <Calculator />
      <Notepad @refresh="refresh" />
    </div>

    <vue-context
      :elementId="'mainId'"
      :options="options"
      ref="vueSimpleContextMenu"
      @option-clicked="optionClicked($event)"
    >
    </vue-context>
  </div>
</template>

<script>
// graphql queries
import getDirectoryByFather from "~/apollo/QUERIES/Directory/getDirectoriesByFather.gql";
import getFileByFather from "~/apollo/QUERIES/File/getFilesByFather.gql";

// Mixins
import ContextMenu from "~/mixins/contextMenu.js";

// Components Base
import File from "~/components/shared/file.vue";
import Directory from "~/components/shared/directory.vue";
import Explorer from "~/components/shared/explorer.vue";
import ModifyFolder from "~/components/shared/modifyFolder.vue";

// Applications
import Calculator from "~/components/apps/calculator.vue";
import Paint from "~/components/apps/paint.vue";
import Notepad from "~/components/apps/notepad.vue";

export default {
  components: { Directory, Explorer, ModifyFolder, File, Calculator, Notepad },
  mixins: [ContextMenu],
  data() {
    return {
      folders: [],
      files: []
    };
  },
  computed: {
    explorerOpen() {
      return this.$store.state.openExplorer;
    },
    editorOpen() {
      return this.$store.state.editor.openEditor;
    },
    item() {
      return this.$store.state.editor.folderToModify;
    },
    options() {
      if (this.$store.state.clipboard) {
        return [
          {
            name: "Crear Carpeta",
            slug: "mkdir"
          },
          {
            name: "Crear Archivo",
            slug: "vim"
          },
          {
            type: "divider"
          },
          {
            name: "Pegar",
            slug: "paste"
          }
        ];
      } else {
        return [
          {
            name: "Crear Carpeta",
            slug: "mkdir"
          },
          {
            name: "Crear Archivo",
            slug: "vim"
          }
        ];
      }
    }
  },
  created() {
    this.$on("event", value => {
      this.refresh(value);
    });
  },
  mounted() {
    this.getRoot();
  },
  methods: {
    refresh(id) {
      if (!this.explorerOpen) {
        this.getRoot();
      } else {
        this.$refs.explorer.getFolders(id);
      }
    },
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      this.switchOption(event.option.slug, "");
    },
    getRoot() {
      this.folders = [];
      this.files = [];
      this.$apollo
        .query({
          query: getDirectoryByFather,
          fetchPolicy: "network-only",
          variables: {
            input: "1"
          }
        })
        .then(res => {
          for (let directory of res.data.directories) {
            this.folders.push(directory);
          }
        });
      this.$apollo
        .query({
          query: getFileByFather,
          fetchPolicy: "network-only",
          variables: {
            input: "1"
          }
        })
        .then(res => {
          for (let file of res.data.files) {
            this.files.push(file);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  height: 100vh;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  .inner-wrapper {
    padding: 0px;
    height: 100vh;
  }
}
</style>
