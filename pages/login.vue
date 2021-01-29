<template>
  <div class="wrapper">
    <div class="background">
      <!-- <img src="~@/assets/images/desktop/security-login.jpg" alt="" /> -->
    </div>
    <div class="inner-wrapper">
      <h1>Simulador de Sistema Operativo - Grupo 4</h1>
      <!-- <vs-input v-model="form.user" class="mt-10" placeholder="Usuario" /> -->
      <v-select
        :options="totalUsers"
        label="name"
        :reduce="user => user.id"
        placeholder="Usuario"
        v-model="form.user"
        class="mt-5"
      ></v-select>
      <vs-input
        type="password"
        v-model="form.password"
        class="mt-3"
        placeholder="Contraseña"
      />
      <vs-button @click="login" success flat active class="mt-3">
        INGRESAR
      </vs-button>
    </div>
  </div>
</template>

<script>
// COMPONENTES
import getUsers from "~/apollo/QUERIES/getUsers.gql";

// FORM
const defaultForm = {
  user: "",
  password: ""
};

export default {
  layout: "empty",
  data() {
    return {
      form: { ...defaultForm },
      totalUsers: [],
      usersActive: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    login() {
      if (!this.form.user) return;

      let user = this.totalUsers.find(t => t.id == this.form.user);

      if (user.role.name == "guest") {
        this.$toast.success("Usuario ingresado correctamente", {
          duration: 2000
        });

        this.$store.commit("localStorage/SET_USER_ID", this.form.user);
        this.$store.commit("localStorage/SET_USER", user);
        this.$router.push("/")
      } else {
        if (user.password == this.form.password) {
          this.$toast.success("Usuario ingresado correctamente", {
            duration: 2000
          });
          this.$store.commit("localStorage/SET_USER_ID", this.form.user);
          this.$store.commit("localStorage/SET_USER", user);
        this.$router.push("/")

        } else {
          this.$toast.error("La contraseña no coincide", { duration: 2000 });
        }
      }
    },
    getUsers() {
      this.$apollo
        .query({
          query: getUsers
        })
        .then(res => {
          this.totalUsers = res.data.user;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.vs--searchable {
  background: $white;
  width: 100%;
  border-radius: 10px;
}
.vs-input-content {
  width: 100%;
}

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
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("~@/assets/images/desktop/security-login.jpg");
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
    h1 {
      color: $white;
    }
  }
}
</style>
