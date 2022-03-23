module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
  },
  extends: "plugin:vue/vue3-recommended",
  // required to lint *.vue files
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  plugins: ["html"],
  // add your custom rules here
  rules: {},
  globals: {},
};
