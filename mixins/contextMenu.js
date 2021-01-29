import DeleteDirectory from "~/apollo/MUTATIONS/Directory/deleteDirectory.gql";
import DeleteFile from "~/apollo/MUTATIONS/File/deleteFile.gql";

export default {
  computed: {
    item() {
      return this.$store.state.editor.folderToModify;
    },
    actualPosition() {
      return this.$store.state.activePosition;
    },
    type() {
      return this.$store.state.editor.type;
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
      if (this.$store.state.editor.clipboard) {
      }
    },
    edit() {
      if (this.type == "folder") {
        this.$store.dispatch("editor/editFolder", this.item);
      } else {
        this.$store.dispatch("editor/editFile", this.item);
      }
    },
    copy() {
      this.$store.dispatch("copyClipboard", this.item);
    },
    cut() {
      this.$store.dispatch("cutClipboard", this.item);
    },
    delete() {
      console.log(this.item);
      console.log(this.type);

      this.$apollo
        .mutate({
          mutation: this.type == "folder" ? DeleteDirectory : DeleteFile,
          variables: {
            input: {
              id: this.item.id
            }
          }
        })
        .then(res => {
          this.$parent.$emit("event", this.actualPosition);
        });
    },
    chmod() {
      this.$store.commit("permissions/SET_PROPERTY", false);

      const {
        readableGuest,
        writableGuest,
        readableRoot,
        writableRoot,
        writableUser,
        readableUser
      } = this.item;

      let rules = {
        readableGuest,
        writableGuest,
        readableRoot,
        writableRoot,
        writableUser,
        readableUser
      };

      this.$store.commit("permissions/SET_OWNER", this.item.user.name);
      this.$store.commit("permissions/SET_RULES", rules);
      this.$store.commit("permissions/SET_PERMISSIONS", true);
    },
    chown() {
      this.$store.commit("permissions/SET_PERMISSIONS", false);

      const {
        readableGuest,
        writableGuest,
        readableRoot,
        writableRoot,
        writableUser,
        readableUser
      } = this.item;

      let rules = {
        readableGuest,
        writableGuest,
        readableRoot,
        writableRoot,
        writableUser,
        readableUser
      };

      this.$store.commit("permissions/SET_OWNER", this.item.user.name);
      this.$store.commit("permissions/SET_RULES", rules);
      this.$store.commit("permissions/SET_PROPERTY", true);
    }
  }
};
