<template>
  <div class="editor-wrapper">
    <div class="action-bar">
      <div></div>
      <div class="name-wrapper">{{ message }}</div>
      <div class="final-actions">
        <img
          class="close"
          src="~@/assets/images/explorer/close.svg"
          @click="closeModifierEditor"
          alt=""
        />
      </div>
    </div>
    <div class="content-wrapper">
      <div class="inner-content">
        <img class="image" :src="type == 'folder' ? folder : file" alt="" />
        <p class="info">Ingrese el nuevo nombre</p>
        <input class="input" @keyup.enter="submit" type="text" v-model="name" />
        <button class="cancel" @click="closeModifierEditor">Cancelar</button>
        <button class="submit" @click="submit">Crear</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  * {
    font-family: "Ubuntu", sans-serif;
  }
  position: absolute;
  width: 450px;
  height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: 0.3s ease-in-out;
  -webkit-box-shadow: 2px 6px 27px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 6px 27px -3px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 6px 27px -3px rgba(0, 0, 0, 0.75);
  .action-bar {
    position: absolute;
    height: 30px;
    background-color: $dark-bg;
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .name-wrapper {
      font-weight: bold;
      color: $white;
      letter-spacing: 2px;
    }
    .final-actions {
      display: flex;
      align-items: center;
      img {
        width: 10px;
        cursor: pointer;
      }
    }
  }
  .content-wrapper {
    max-width: 100%;
    height: 100%;
    background-color: $dark;

    .inner-content {
      padding: 60px;
      display: grid;
      grid-template-areas:
        "image info info"
        "image input input"
        ". cancel submit";
      grid-template-columns: 70px 1fr 1fr;
      grid-template-rows: 20px 40px 40px;
      align-items: center;
      grid-gap: 10px;
      .image {
        width: 60px;
        grid-area: image;
      }
      .info {
        grid-area: info;
        color: $white;
      }
      .input {
        grid-area: input;
        height: 100%;
        outline: none;
        border: none;
        background: $newdark;
        color: $white;
        padding: 0 10px;
      }
      .cancel {
        grid-area: cancel;
      }
      .submit {
        grid-area: submit;
      }
      .cancel,
      .submit {
        background: $newdark;
        height: 100%;
        color: $white;
      }
    }
  }
}
</style>

<script>
// Directory
import CreateDirectory from "~/apollo/MUTATIONS/Directory/createDirectory.gql";
import UpdateDirectory from "~/apollo/MUTATIONS/Directory/updateDirectory.gql";

// File
import CreateFile from "~/apollo/MUTATIONS/File/createFile.gql";
import UpdateFile from "~/apollo/MUTATIONS/File/updateFile.gql";

export default {
  data() {
    return {
      file: require("~/assets/images/base/file.svg"),
      folder: require("~/assets/images/base/folder.svg"),
      name: ""
    };
  },
  computed: {
    editor() {
      return this.$store.state.editor.folderToModify;
    },
    message() {
      return this.$store.state.editor.typeEditor;
    },
    type() {
      return this.$store.state.editor.type;
    },
    folderPosition() {
      return this.$store.state.activePosition;
    },
    user() {
      return this.$store.state.localStorage.userId;
    },
    isEditing() {
      return this.$store.state.editor.isEditing;
    },
    selectedId() {
      return this.$store.state.editor.selectedId;
    }
  },
  methods: {
    closeModifierEditor() {
      this.$store.dispatch("editor/setType", "");
      this.$store.dispatch("editor/closeEditor");
    },
    submit() {
      if (this.name) {
        let input = {
          name: this.name,
          user: this.user,
          belongsTo: this.folderPosition,
          readableRoot: true,
          writableRoot: true,
          readableUser: true,
          writableUser: true,
          readableGuest: true,
          writableGuest: false
        };

        if (this.type !== "folder") {
          input = { ...input, content: "" };
        }

        if (!!this.isEditing) {
          input = { ...input, id: this.selectedId };
        }

        this.$apollo
          .mutate({
            mutation: !!this.isEditing
              ? this.type == "folder"
                ? UpdateDirectory
                : UpdateFile
              : this.type == "folder"
              ? CreateDirectory
              : CreateFile,
            variables: { input }
          })
          .then(res => {
            this.$store.dispatch("editor/setType", "");
            this.$emit("refresh", this.folderPosition);
            this.$store.dispatch("editor/closeEditor");
          });
      }
    }
  }
};
</script>
