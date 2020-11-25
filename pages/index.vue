<template>
  <div class="wrapper" @contextmenu.prevent.stop="handleClick($event, data)">
    <div class="background">
      <img src="~@/assets/images/desktop/background.jpg" alt="" />
    </div>
    <div class="inner-wrapper" >
      <Directory v-for="folder of folders" :key="folder.id" :data="folder" />
      <Explorer v-if="!!explorerOpen" />
    </div>

     <vue-context
      :elementId="'mainId'"
      :options="options"
      ref="vueSimpleContextMenu"
      @option-clicked="optionClicked"
    >
    </vue-context>
  </div>
</template>

<script>
// graphql queries
import getDirectoryByFather from "~/apollo/QUERIES/Directory/getDirectoriesByFather.gql";

// Components Base
import Directory from "~/components/shared/directory.vue";
import Explorer from "~/components/shared/explorer.vue";
export default {
  components: { Directory, Explorer },
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
  },
  mounted() {
    this.getRoot();
  },
  methods: {
     handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      window.alert(JSON.stringify(event));
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

