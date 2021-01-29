<template>
  <div>
    <div class="navbar">
      <div class="navbar__actions">
        <div class="first-section">
          <button class="inicio" @click="activeStartbar = !activeStartbar">
            Inicio
          </button>
          <div class="list-command" :class="!!activeStartbar ? 'active' : ''">
            <ul>
              <li @click="openNotepad">Block de Notas</li>
              <!-- <li>Paint</li> -->
              <li @click="openCalculator">Calculadora</li>
              <li @click="logout">Cerrar Sesión</li>
            </ul>
          </div>
        </div>
        <div class="second-section">
          <p class="hour">{{ time }}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      time: null,
      activeStartbar: false
    };
  },
  computed: {},
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  methods: {
    openNotepad() {
      this.activeStartbar = false;

      let rules = {
        readableGuest: true,
        writableGuest: true,
        readableRoot: true,
        writableRoot: true,
        writableUser: true,
        readableUser: this.$store.state.localStorage.user.role.name == "guest" ? true : false
      };

      this.$store.commit("permissions/SET_RULES", rules);
      this.$store.commit("apps/SET_NOTEPAD", true);
    },
    openCalculator() {
      this.activeStartbar = false;
      this.$store.commit("apps/SET_CALCULATOR", true);
    },
    getTime() {
      var date = new Date();
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hour = date.getHours();

      this.time = hour + ":" + minutes + ":" + seconds;
    },
    logout() {
      this.$store.dispatch("localStorage/logout");
      this.$router.push({ name: "login" });

      this.$toast.success("Has cerrado sesión", {
        duration: 2000
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  &__actions {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    height: 40px;
    background-color: $newdark;
    padding: 0 10px;
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .first-section {
      .list-command {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        z-index: 101;
        left: 0;
        bottom: 40px;

        &.active {
          pointer-events: all;
          opacity: 1;
        }
        ul {
          li {
            padding: 10px 150px 10px 20px;
            background: $newdark;
            color: $white;
            &:hover {
              background: $dark;
            }
          }
        }
      }
      .inicio {
        background: rgb(173, 121, 121);
        padding: 0 20px;
        color: $white;
        font-family: "Poppins";
        height: 40px;
      }
    }

    .second-section {
      .hour {
        color: $white;
      }
    }
  }
}
</style>
