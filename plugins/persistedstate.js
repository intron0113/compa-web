import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    compa: "任意の名前",
  })(store);
};
