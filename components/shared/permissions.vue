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
          <vs-button>Guardar</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
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
    isSameUser() {
      return this.$store.state.localStorage.user.name == this.owner;
    },
    owner() {
      return this.$store.state.permissions.owner;
    },
    rules: {
      get() {
        this.form = { ...this.$store.state.permissions.rules };
        return this.$store.state.permissions.rules;
      },
      set(val) {
        console.log(val);
        this.$store.commit("permissions/SET_RULES", val);
      }
    }
  },
  methods: {
    close() {
      this.$store.commit("permissions/SET_PERMISSIONS", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.property-wrapper {
  position: absolute;
  z-index: 11;
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
    .actions{
       display: flex;
       justify-content: center;
    }
  }
}
</style>
