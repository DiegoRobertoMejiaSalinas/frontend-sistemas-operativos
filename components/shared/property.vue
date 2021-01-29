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
        <li>Escritura: {{rules.writableRoot ? 'Sí' : 'No'}}</li>
        <li>Lectura: {{rules.readableRoot ? 'Sí' : 'No'}}</li>
        <hr />
        <li>USUARIOS</li>
        <li>Escritura: {{rules.writableUser ? 'Sí' : 'No'}}</li>
        <li>Lectura: {{rules.readableUser ? 'Sí' : 'No'}}</li>
        <hr />
        <li>INVITADO</li>
        <li>Escritura: {{rules.writableGuest ? 'Sí' : 'No'}}</li>
        <li>Lectura: {{rules.readableGuest ? 'Sí' : 'No'}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    owner() {
      return this.$store.state.permissions.owner;
    },
    rules(){
      return this.$store.state.permissions.rules
    }
  },
  methods: {
    close() {
      this.$store.commit("permissions/SET_PROPERTY", false);
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
    }
  }
}
</style>
