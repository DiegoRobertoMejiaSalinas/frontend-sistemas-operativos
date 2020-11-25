<template>
  <div
    v-if="data"
    @dblclick="openExplorer(data)"
    @contextmenu.prevent.stop="handleClick($event, data)"
    class="directory-wrapper mx-10 mt-3"
  >
    <img src="~@/assets/images/base/folder.svg" alt="" />
    <p>{{ data.name }}</p>

    <vue-context
      :elementId="'directoryId'"
      :options="options"
      ref="vueSimpleContextMenu"
      @option-clicked="optionClicked"
    >
    </vue-context>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      options: [
        {
          name: "Editar",
          slug: "edit",
        },
        {
          type: "divider",
        },
        {
          name: "Cortar",
          slug: "cut",
        },
        {
          name: "Copiar",
          slug: "copy",
        },
         {
          type: "divider",
        },
        {
          name: "Eliminar",
          slug: "delete",
        },
        {
          type: "divider",
        },
          {
          name: "Permisos",
          slug: "chmod",
        },
         {
          name: "Propietario",
          slug: "chown",
        },
      ],
    };
  },
  methods: {
    openExplorer(data) {
      this.$store.dispatch("openExplorer", data);
    },
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      console.log(JSON.stringify(event));
    },
  },
};
</script>

<style lang="scss" scoped>
.directory-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  img {
    width: 40px;
  }
  p {
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // transition: .3s ease-in-out;
    color: $white;
  }
  &:hover {
    p {
      width: 100%;
      overflow: initial;
      text-overflow: initial;
      white-space: initial;
    }
  }
}
</style>