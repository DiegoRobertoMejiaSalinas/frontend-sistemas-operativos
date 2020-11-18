<template>
  <div class="wrapper">
    <div class="inner-wrapper">
      <h1>Simulador de Sistema Operativo - Grupo 4</h1>
      <vs-input v-model="form.user" class="mt-10" placeholder="Usuario" />
      <vs-input v-model="form.password" class="mt-3" placeholder="Contraseña" />
      <vs-button transparent active class="mt-3 mb-10"> INGRESAR </vs-button>
    </div>
  </div>
</template>

<script>
const defaultForm = {
  user: "",
  password: "",
};

export default {
  data() {
    return {
      form: { ...defaultForm },
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>