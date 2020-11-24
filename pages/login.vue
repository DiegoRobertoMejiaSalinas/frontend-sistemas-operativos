<template>
  <div class="wrapper">
    <div class="background">
      <!-- <img src="~@/assets/images/desktop/security-login.jpg" alt="" /> -->
    </div>
    <div class="inner-wrapper">
      <h1>Simulador de Sistema Operativo - Grupo 4</h1>
      <vs-input v-model="form.user" class="mt-10" placeholder="Usuario" />
      <vs-input v-model="form.password" class="mt-3" placeholder="Contraseña" />
      <vs-button success flat active class="mt-3 mb-10"> INGRESAR </vs-button>
    </div>
  </div>
</template>

<script>
// COMPONENTES

// FORM
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
  .background {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('~@/assets/images/desktop/security-login.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    img {
      width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  .inner-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
      color: $white;
    }
  }
}
</style>