import firebase from "@/plugins/firebase";

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
      const loggedInUserNotAccess = ["/", "/auth/register", "/auth/login"];
      if (user && loggedInUserNotAccess.includes(route.name)) {
        return redirect("/posts");
      }
    }
  });
}
