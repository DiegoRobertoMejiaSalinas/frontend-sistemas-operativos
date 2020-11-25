<template>
  <div class="wrapper" @contextmenu.prevent.stop="handleClick($event)">
    <div class="background">
      <img src="~@/assets/images/desktop/background.jpg" alt="" />
    </div>
    <div class="inner-wrapper">
      <Directory v-for="folder of folders" :key="folder.id" :data="folder" />
      <Explorer v-if="!!explorerOpen" />
      <ModifyFolder v-if="!!editorOpen" />
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

// Mixins
import ContextMenu from "~/mixins/contextMenu.js";

// Components Base
import Directory from "~/components/shared/directory.vue";
import Explorer from "~/components/shared/explorer.vue";
import ModifyFolder from "~/components/shared/modifyFolder.vue";
export default {
  components: { Directory, Explorer, ModifyFolder },
  mixins: [ContextMenu],
  data() {
    return {
      folders: [],
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
    explorerOpen() {
      return this.$store.state.openExplorer;
    },
    editorOpen() {
      return this.$store.state.editor.openEditor;
    },
  },
  mounted() {
    this.getRoot();
  },
  methods: {
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      this.switchOption(event.option.slug, "");
    },
    getRoot() {
      this.$apollo
        .query({
          query: getDirectoryByFather,
          variables: {
            input: "1",
          },
        })
        .then((res) => {
          for (let directory of res.data.directories) {
            this.folders.push(directory);
          }
        });
    },
  },
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

