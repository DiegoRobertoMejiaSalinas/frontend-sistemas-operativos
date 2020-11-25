export default {
  computed: {
    folder() {
      return this.$store.state.editor.folderToModify;
    }
  },
  methods: {
    switchOption(event) {
      if (event == "mkdir") {
        this.mkdir();
        return;
      }
      if (event == "vim") {
        this.vim();
        return;
      }
      if (event == "paste") {
        this.paste();
        return;
      }
      if (event == "edit") {
        this.edit();
        return;
      }
      if (event == "cut") {
        this.cut();
        return;
      }
      if (event == "copy") {
        this.copy();
        return;
      }
      if (event == "delete") {
        this.delete();
        return;
      }
      if (event == "chmod") {
        this.chmod();
        return;
      }
      if (event == "chown") {
        this.chown();
        return;
      }
    },
    mkdir() {
      this.$store.dispatch("editor/closeEditor");
      this.$store.dispatch("editor/createFolder");
    },
    vim() {
      this.$store.dispatch("editor/closeEditor");
      this.$store.dispatch("editor/createFile");
    },
    paste() {
      console.log("pegar");
    },
    edit() {
      this.$store.dispatch("editor/editFolder", this.folder);
    },
    copy() {
      this.$store.dispatch("copyClipboard", this.folder);
    },
    cut() {
      this.$store.dispatch("cutClipboard", this.folder);
    },
    delete() {
      console.log("pegar");
    },
    chmod() {
      console.log("hoplaa");
    },
    chown() {
      console.log("archivo");
    }
  }
};
