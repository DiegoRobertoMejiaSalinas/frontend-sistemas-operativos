<template>
  <div class="property-wrapper">
    <div class="uptop-bar">
      <p @click="close">X</p>
    </div>
    <div class="content-wrapper">
      <ul>
        <li>Propietario: {{ owner }}</li>
        <hr />
        <li>
          ADMINISTRADOR
        </li>
        <li>
          Escritura:
          <vs-checkbox v-model="form.writableRoot"> </vs-checkbox>
        </li>
        <li>
          Lectura: <vs-checkbox v-model="form.readableRoot"> </vs-checkbox>
        </li>
        <hr />
        <li>USUARIOS</li>
        <li>
          Escritura: <vs-checkbox v-model="form.writableUser"> </vs-checkbox>
        </li>
        <li>
          Lectura: <vs-checkbox v-model="form.readableUser"> </vs-checkbox>
        </li>
        <hr />
        <li>INVITADO</li>
        <li>
          Escritura: <vs-checkbox v-model="form.writableGuest"> </vs-checkbox>
        </li>
        <li>
          Lectura: <vs-checkbox v-model="form.readableGuest"> </vs-checkbox>
        </li>
      </ul>

      <div class="text-center actions">
        <vs-button @click="savePermissions">Guardar</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateDirectory from "~/apollo/MUTATIONS/Directory/updateDirectory.gql";
import UpdateFile from "~/apollo/MUTATIONS/File/updateFile.gql";

export default {
  data() {
    return {
      form: { ...this.rules }
    };
  },
  watch: {
    rules: {
      deep: true,
      handler(val) {
        console.log(val);
      }
    }
  },
  computed: {
  
    owner() {
      return this.$store.state.permissions.owner;
    },
    nameActual() {
      return this.$store.state.permissions.folderName;
    },
    id() {
      return this.$store.state.permissions.id;
    },
    folderPosition() {
      return this.$store.state.activePosition;
    },
    user() {
      return this.$store.state.localStorage.user;
    },
     userPermissions(){
      return this.$store.state.permissions.user
    },
    userId() {
      return this.$store.state.localStorage.userId;
    },
    rules: {
      get() {
        this.form = { ...this.$store.state.permissions.rules };
        return this.$store.state.permissions.rules;
      },
      set(val) {
        this.$store.commit("permissions/SET_RULES", val);
      }
    }
  },
  methods: {
    close() {
      this.$store.commit("permissions/SET_PERMISSIONS", false);
    },
    savePermissions() {
      if (this.user.name == "root") {
        this.saveApollo();
      } else {
        if (this.user.name == this.owner) {
          this.saveApollo();
        } else {
          this.$toast.info(
            `Solo el ADMINISTRADOR o el usuario ${this.owner.toUpperCase()} pueden cambiar los permisos de este archivo`,
            { duration: 3000 }
          );
        }
      }
    },
    saveApollo() {

      let input = {
        name: this.nameActual,
        user: this.userPermissions.id,
        id: this.id,
        belongsTo: this.folderPosition,
        readableRoot: this.form.readableRoot,
        writableRoot: this.form.writableRoot,
        readableUser: this.form.readableUser,
        writableUser: this.form.writableUser,
        readableGuest: this.form.readableGuest,
        writableGuest: this.form.writableGuest
      };

      if(this.$store.state.editor.type == "file"){
        input = {...input, content: this.$store.state.permissions.content}
      }

      this.$apollo
        .mutate({
          mutation:
            this.$store.state.editor.type == "file"
              ? UpdateFile
              : UpdateDirectory,
          variables: { input }
        })
        .then(res => {
          this.$emit("refresh", this.folderPosition);
          this.$store.commit("permissions/SET_PERMISSIONS", false);
            this.$toast.success(
            `Se ha modificado los permisos del archivo ${this.nameActual}`,
            { duration: 3000 }
          );
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.property-wrapper {
  position: absolute;
  z-index: 116;
  top: 50%;
  left: 50%;
  width: 450px;
  transform: translate(-50%, -50%);

  .uptop-bar {
    height: 35px;
    background: $newdark;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;
    p {
      color: $white;
      cursor: pointer;
    }
  }
  .content-wrapper {
    padding: 20px 10px;
    background: $dark;
    li {
      margin: 0px 10px;
      padding: 10px;
      letter-spacing: 2px;
      color: $white;
      display: flex;
      div {
        margin-left: 10px;
      }
    }
    .actions {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
