import firebase from "@/plugins/firebase";
// import firebase from "@/nuxt.config";

export default function ({ store, route, redirect }) {
  console.log(route.params);
  console.log(store);
  console.log(store.state.user);
  const id = route.params;
  // if (store.state.user && store.state.user.uid !== undefined) return;

  // onAuthStateChangedAction((user) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      console.log(user);
      store.commit("add", { uid, email, displayName, photoURL });
      // const loggedInUserNotAccess = ["/", "/auth/register", "/auth/login"];
      // if (user && loggedInUserNotAccess.includes(route.name)) {
      // return redirect("/posts");
      // }
      if (id.uiD !== uid) {
        redirect("/posts");
        // console.log(route.name);
      }
    } else {
      if (route.name !== "index") {
        redirect("/");
        // console.log(route.name);
      }
    }
  });
}
