import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "compa",
    paths: ["search"],
    storage: window.sessionStorage,
  })(store);
};
