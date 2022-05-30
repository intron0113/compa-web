import firebase from "@/plugins/firebase";
// import firebase from "@/nuxt.config";

export default function ({ store, route, redirect }) {
  const id = route.params;
  // if (store.state.user && store.state.user.uid !== undefined) return;

  // onAuthStateChangedAction((user) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      store.commit("add", { uid, email, displayName, photoURL });
      // const loggedInUserNotAccess = ["/", "/auth/register", "/auth/login"];
      // if (user && loggedInUserNotAccess.includes(route.name)) {
      // return redirect("/posts");
      // }
    } else {
      if (route.name !== "index") {
        redirect("/");
      }
    }
  });
}
