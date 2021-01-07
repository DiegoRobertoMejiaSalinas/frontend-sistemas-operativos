<template>
  <div class="notepad-wrapper" v-show="!!notepad">
    <div class="top-bar">
      <p></p>
      <!-- <p class="title">{{ title }}</p> -->
      <input type="text" v-model="title" class="title" />
      <div class="close" @click="notepad = false">X</div>
    </div>

    <froala
      id="edit"
      v-model.trim="text"
      :tag="'textarea'"
      :config="config"
      autocomplete="off"
    ></froala>

    <div class="save" @click="saveText">Guardar</div>
  </div>
</template>

<style lang="scss" scoped>
.notepad-wrapper {
  position: absolute;
  z-index: 75;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 720px;
  height: 550px;
  background-color: #eaedef;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;

  .top-bar {
    display: flex;
    margin: 10px;
    justify-content: space-between;
    align-items: center;
    .close {
      width: 30px;
      height: 30px;
      background: rgb(206, 115, 115);
      border-radius: 50%;
      border-width: 0;
      // margin: 10px;
      // margin: 10px 10px 10px auto;
      font-size: 15px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Poppins";
      cursor: pointer;
    }

    .title {
      background: transparent;
      border: none;
      outline: none;
      text-align: center;
      width: 400px;
      font-size: 20px;
    }
  }

  .save {
    height: 30px;
    background: rgb(206, 115, 115);
    border-radius: 5px;
    border-width: 0;
    margin: 10px;
    padding: 0 20px;
    font-size: 15px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins";
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.fr-box.fr-basic {
  height: 100%;
  width: 100%;
}

.fr-box.fr-basic.fr-top .fr-wrapper {
  height: 90%;
}

.fr-box.fr-basic .fr-element {
  height: 100%;
}

.fr-second-toolbar {
  display: none;
}
</style>

<script>
// File
import CreateFile from "~/apollo/MUTATIONS/File/createFile.gql";
export default {
  data() {
    return {
      text: "",
      title: "Nuevo Documento",
      // CONFIG FROALA
      config: {
        language: "es",
        placeholderText: "",
        charCounterCount: false,
        toolbarButtons: [
          [
            "undo",
            "redo",
            "bold",
            "fontSize",
            "textColor",
            "alignLeft",
            "alignCenter",
            "alignRight",
            "insertTable",
            "formatOLSimple"
          ]
        ]
      }
    };
  },
  computed: {
    folderPosition() {
      return this.$store.state.activePosition;
    },
    user() {
      return this.$store.state.localStorage.userId;
    },
    notepad: {
      get() {
        return this.$store.state.apps.notepad;
      },
      set(val) {
        this.$store.commit("apps/SET_NOTEPAD", val);
      }
    }
  },
  methods: {
    saveText() {
      let input = {
        name: this.title,
        user: this.user,
        belongsTo: this.folderPosition,
        content: this.text
      };

      this.$apollo
        .mutate({
          mutation: CreateFile,
          variables: { input }
        })
        .then(res => {
          this.$emit("refresh", this.folderPosition);
          this.notepad = "";
          this.text = "";
          this.title = "Nuevo Documento";
        });
    }
  }
};
</script>
