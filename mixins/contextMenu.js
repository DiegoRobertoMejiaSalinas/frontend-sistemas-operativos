import DeleteDirectory from "~/apollo/MUTATIONS/Directory/deleteDirectory.gql";
import DeleteFile from "~/apollo/MUTATIONS/File/deleteFile.gql";

// Directory
import CreateDirectory from "~/apollo/MUTATIONS/Directory/createDirectory.gql";
import UpdateDirectory from "~/apollo/MUTATIONS/Directory/updateDirectory.gql";

// File
import CreateFile from "~/apollo/MUTATIONS/File/createFile.gql";
import UpdateFile from "~/apollo/MUTATIONS/File/updateFile.gql";

export default {
  computed: {
    item() {
      return this.$store.state.editor.folderToModify;
    },
    actualPosition() {
      return this.$store.state.activePosition;
    },
    activeFolder() {
      return this.$store.state.activeFolder;
    },
    type() {
      return this.$store.state.editor.type;
    },
    user() {
      return this.$store.state.localStorage.user;
    },
    userPermissions() {
      return this.$store.state.permissions.user;
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
    notEnoughAccess() {
      this.$toast.error(
        "No cuentas con los permisos suficientes para crear un archivo",
        { duration: 2000 }
      );
    },
    mkdir() {
      if (
        this.activeFolder &&
        this.user.role.name == "admin" &&
        !this.activeFolder.writableRoot
      ) {
        this.notEnoughAccess();
        return;
      }
      if (
        this.activeFolder &&
        this.user.role.name == "user" &&
        !this.activeFolder.writableUser &&
        this.userPermissions.id !== this.$store.state.localStorage.user.id
      ) {
        this.notEnoughAccess();
        return;
      }
      if (
        this.activeFolder &&
        this.user.role.name == "guest" &&
        !this.activeFolder.writableGuest
      ) {
        this.notEnoughAccess();
        return;
      }

      this.$store.dispatch("editor/closeEditor");
      this.$store.dispatch("editor/createFolder");
    },
    vim() {
      if (
        this.activeFolder &&
        this.user.role.name == "admin" &&
        !this.activeFolder.writableRoot
      ) {
        this.notEnoughAccess();
        return;
      }
      if (
        this.activeFolder &&
        this.user.role.name == "user" &&
        !this.activeFolder.writableUser &&
        this.userPermissions.id !== this.$store.state.localStorage.user.id
      ) {
        this.notEnoughAccess();
        return;
      }
      if (
        this.activeFolder &&
        this.user.role.name == "guest" &&
        !this.activeFolder.writableGuest
      ) {
        this.notEnoughAccess();
        return;
      }

      this.$store.dispatch("editor/closeEditor");
      this.$store.dispatch("editor/createFile");
    },
    paste() {
      if (this.$store.state.clipboard) {
        if (
          this.activeFolder &&
          this.user.role.name == "admin" &&
          !this.activeFolder.writableRoot
        ) {
          this.$toast.error(
            "No cuentas con los permisos suficientes para pegar un archivo en este directorio",
            { duration: 2000 }
          );
          return;
        }
        if (
          this.activeFolder &&
          this.user.role.name == "user" &&
          !this.activeFolder.writableUser &&
          this.userPermissions.id !== this.$store.state.localStorage.user.id
        ) {
          this.$toast.error(
            "No cuentas con los permisos suficientes para pegar un archivo en este directorio",
            { duration: 2000 }
          );
          return;
        }
        if (
          this.activeFolder &&
          this.user.role.name == "guest" &&
          !this.activeFolder.writableGuest
        ) {
          this.$toast.error(
            "No cuentas con los permisos suficientes para pegar un archivo en este directorio",
            { duration: 2000 }
          );
          return;
        }
      }

      // SE REALIZA EL PEGADO
      if (this.$store.state.typeClipboard == "cut") {
        // SI ES ARCHIVO
        if (typeof this.$store.state.clipboard.content != "undefined") {
          const clipboard = this.$store.state.clipboard;
          let input = {
            name: clipboard.name,
            id: parseInt(clipboard.id),
            user: parseInt(clipboard.user.id),
            content: clipboard.content,
            belongsTo: this.actualPosition,
            readableRoot: clipboard.readableRoot,
            writableRoot: clipboard.writableRoot,
            readableUser: clipboard.readableUser,
            writableUser: clipboard.writableUser,
            readableGuest: clipboard.readableGuest,
            writableGuest: clipboard.writableGuest
          };
          this.$apollo
            .mutate({
              mutation: UpdateFile,
              variables: { input }
            })
            .then(res => {
              this.$nuxt.$emit("refreshing");
              this.$toast.success(
                "Se ha pegado satisfactoriamente el archivo",
                {
                  duration: 2000
                }
              );
            });
        }
        // SI ES UN DIRECTORIO
        else {
          const clipboard = this.$store.state.clipboard;
          let input = {
            name: clipboard.name,
            id: parseInt(clipboard.id),
            user: parseInt(clipboard.user.id),
            belongsTo: this.actualPosition,
            readableRoot: clipboard.readableRoot,
            writableRoot: clipboard.writableRoot,
            readableUser: clipboard.readableUser,
            writableUser: clipboard.writableUser,
            readableGuest: clipboard.readableGuest,
            writableGuest: clipboard.writableGuest
          };
          this.$apollo
            .mutate({
              mutation: UpdateDirectory,
              variables: { input }
            })
            .then(res => {
              this.$nuxt.$emit("refreshing");
              this.$toast.success(
                "Se ha pegado satisfactoriamente el directorio",
                {
                  duration: 2000
                }
              );
            });
        }
      }
      // SI ES COPIADO
      else {
        // SI ES ARCHIVO
        if (typeof this.$store.state.clipboard.content != "undefined") {
          const clipboard = this.$store.state.clipboard;
          let input = {
            name: clipboard.name,
            user: parseInt(this.$store.state.localStorage.user.id),
            content: clipboard.content,
            belongsTo: this.actualPosition,
            readableRoot: clipboard.readableRoot,
            writableRoot: clipboard.writableRoot,
            readableUser: clipboard.readableUser,
            writableUser: clipboard.writableUser,
            readableGuest: clipboard.readableGuest,
            writableGuest: clipboard.writableGuest
          };
          this.$apollo
            .mutate({
              mutation: CreateFile,
              variables: { input }
            })
            .then(res => {
              this.$nuxt.$emit("refreshing");
              this.$toast.success(
                "Se ha pegado satisfactoriamente el archivo",
                {
                  duration: 2000
                }
              );
            });
        }
        // SI ES UN DIRECTORIO
        else {
          const clipboard = this.$store.state.clipboard;
          let input = {
            name: clipboard.name,
            user: parseInt(this.$store.state.localStorage.user.id),
            belongsTo: this.actualPosition,
            readableRoot: clipboard.readableRoot,
            writableRoot: clipboard.writableRoot,
            readableUser: clipboard.readableUser,
            writableUser: clipboard.writableUser,
            readableGuest: clipboard.readableGuest,
            writableGuest: clipboard.writableGuest
          };
          this.$apollo
            .mutate({
              mutation: CreateDirectory,
              variables: { input }
            })
            .then(res => {
              this.$nuxt.$emit("refreshing");
              this.$toast.success(
                "Se ha pegado satisfactoriamente el directorio",
                {
                  duration: 2000
                }
              );
            });
        }
      }

      // LIMPIAMOS TODO
      this.$store.commit("CLEAN_CLIPBOARD");
    },
    edit() {
      if (this.user.role.name == "admin" && !this.item.writableRoot) {
        this.$toast.error(
          "No cuentas con los permisos suficientes para editar este archivo",
          { duration: 2000 }
        );
        return;
      }
      if (
        this.user.role.name == "user" &&
        !this.item.writableUser &&
        this.userPermissions.id !== this.$store.state.localStorage.user.id
      ) {
        this.$toast.error(
          "No cuentas con los permisos suficientes para editar este archivo",
          { duration: 2000 }
        );
        return;
      }
      if (this.user.role.name == "guest" && !this.item.writableGuest) {
        this.$toast.error(
          "No cuentas con los permisos suficientes para editar este archivo",
          { duration: 2000 }
        );
        return;
      }

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
      if (this.user.role.name == "admin" && !this.item.writableRoot) {
        this.$toast.error(
          "No cuentas con los permisos suficientes para cortar este archivo",
          { duration: 2000 }
        );
        return;
      }
      if (
        this.user.role.name == "user" &&
        !this.item.writableUser &&
        this.userPermissions.id !== this.$store.state.localStorage.user.id
      ) {
        this.$toast.error(
          "No cuentas con los permisos suficientes para cortar este archivo",
          { duration: 2000 }
        );
        return;
      }
      if (this.user.role.name == "guest" && !this.item.writableGuest) {
        this.$toast.error(
          "No cuentas con los permisos suficientes para cortar este archivo",
          { duration: 2000 }
        );
        return;
      }
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
