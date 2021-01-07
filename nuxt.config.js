export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Simulador de Sistema Operativo - Grupo 4",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["vuesax/dist/vuesax.css", "~/scss/index.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "@/plugins/vuesax",
    "@/plugins/vuecontext.js",
    { src: "~/plugins/editor.js", mode: "client" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    "@nuxtjs/apollo",
    "nuxt-vuex-localstorage"
  ],

  apollo: {
    clientConfigs: {
      default: "~/plugins/apollo.js"
    }
  },

  styleResources: {
    scss: ["~/scss/index.scss"]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
