import colors from "vuetify/es5/util/colors";
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "~/assets/css/reset.css",
    "~/assets/scss/style.scss",
    "simplemde/dist/simplemde.min.css",
  ],
  styleResources: {
    scss: ["~/assets/scss/_color.scss", "~/assets/scss/_color.scss"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    "~/plugins/day.js",
    "@/plugins/moment",
    {
      src: "@/plugins/plugin",
      mode: "client",
    },
    { src: "~plugins/nuxt-simplemde-plugin.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    "~/components/templates",
    "~/components/atoms",
    "~/components/molecules",
    "~/components/organisms",
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // Simple usage
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/markdownit",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    ["@nuxtjs/moment", ["ja"]],
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyDQ292j9lfBG80MA_2SaUilvXESL215AvQ",
          authDomain: "compa-med.firebaseapp.com",
          projectId: "compa-med",
          storageBucket: "compa-med.appspot.com",
          messagingSenderId: "70436731025",
          appId: "1:70436731025:web:2127e926c21aa8a144e730",
          measurementId: "G-580RRYM4J8",
          // databaseURL: "https://compa-med.firebaseio.com",
        },
        services: {
          auth: true,
          firestore: true,
          storage: true,
          database: true,
        },
      },
    ],
  ],
  markdownit: {
    injected: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL: "https://compa-med-default-rtdb.firebaseio.com" },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      light: true,

      themes: {
        light: {
          primary: "#000080",
          secondary: "#ffffff",
          accent: "#FFB000",
          error: colors.red.accent3,
        },
        dark: {
          primary: "#202f55",
          accent: colors.grey.darken3,
          secondary: "#ffffff",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // vendeer: ["moment"],
    // plugins: [
    //   new MomentLocalesPlugin({
    //     localesToKeep: ["es-us", "ja"],
    //   }),
    // ],
  },
};
