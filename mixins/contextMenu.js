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
    },
    user() {
      return this.$store.state.localStorage.user;
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
      if (this.user.name == "root") {
        this.deleteApollo();
      } else {
        if (this.user.name == this.item.user.name) {
          this.deleteApollo();
        } else {
          this.$toast.error(
            `Solo el ADMINISTRADOR o el usuario ${this.item.user.name.toUpperCase()} pueden eliminar este archivo`,
            { duration: 3000 }
          );
        }
      }

      return;
    },
    deleteApollo() {
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
          this.$toast.error(`Se ha eliminado el archivo correctamente`, {
            duration: 3000
          });
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

      this.$store.commit("editor/SET_TYPE", this.type);
      if (this.item.content) {
        this.$store.commit("permissions/SET_CONTENT", this.item.content);
      } else {
        this.$store.commit("permissions/SET_CONTENT", "");
      }
      this.$store.commit("permissions/SET_OWNER", this.item.user.name);
      this.$store.commit("permissions/SET_USER_DATA", this.item.user);
      this.$store.commit("permissions/SET_ID", this.item.id);
      this.$store.commit("permissions/SET_FOLDER_NAME", this.item.name);
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

      this.$store.commit("editor/SET_TYPE", this.type);
      if (this.item.content) {
        this.$store.commit("permissions/SET_CONTENT", this.item.content);
      } else {
        this.$store.commit("permissions/SET_CONTENT", "");
      }

      this.$store.commit("permissions/SET_USER_DATA", this.item.user);
      this.$store.commit("permissions/SET_OWNER", this.item.user.name);
      this.$store.commit("permissions/SET_ID", this.item.id);
      this.$store.commit("permissions/SET_FOLDER_NAME", this.item.name);
      this.$store.commit("permissions/SET_RULES", rules);
      this.$store.commit("permissions/SET_PROPERTY", true);
    }
  }
};
