import firebase from "@/plugins/firebase";
// import firebase from "@/nuxt.config";

export default function ({ store, route, redirect }) {
  console.log(route.name);
  console.log(store);
  console.log(store.state.user);
  // if (store.state.user && store.state.user.uid !== undefined) return;

  // onAuthStateChangedAction((user) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      console.log(user);
      store.commit("add", { uid, email, displayName, photoURL });
    } else {
      if (route.name !== "index") {
        redirect("/");
        // console.log(route.name);
      }
    }
  });
}
