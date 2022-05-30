import firebase from "@/plugins/firebase";

export default function ({ store, route, redirect }) {
  // if (store.state.user && store.state.user.uid !== undefined) return;

  // onAuthStateChangedAction((user) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      store.commit("add", { uid, email, displayName, photoURL });
      const loggedInUserNotAccess = ["auth-registerFinish"];
      if (user && loggedInUserNotAccess.includes(route.name)) {
        return redirect("/posts");
      }
    } else {
      if (route.name !== "index") {
        redirect("/");
        // console.log(route.name);
      }
    }
  });
}
