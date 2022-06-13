export const state = () => ({
  user: {
    uid: "",
    email: "",
    name: "",
    photoURL: "",
  },
  selectUserData: {
    uid: "",
    name: "",
    photoURL: "",
    affiliation: "",
    job: "",
    prefectures: "",
    profileText: "",
  },
  toast: {
    msg: null,
    color: "error",
    timeout: 4000,
  },
});

export const getters = {
  user: (state) => {
    return state.user;
  },
  selectUserData: (state) => {
    return state.selectUserData;
  },
};

export const actions = {
  async confirmLogin({ dispatch, state }, payload) {
    try {
      await this.$fire.auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch("checkLogin");
          const storageRef = this.$fire.storage.ref();
          this.$fire.auth.currentUser.updateProfile({
            displayName: "ゲストログイン",
          });
          this.$fire.firestore.collection("user").doc(user.uid).set({
            uid: user.uid,
            name: "ゲストログイン",
            photoURL: "",
            affiliation: "",
            job: "",
            prefectures: "",
            profileText: "",
          });
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },

  // 追加
  // トーストデータをセットする
  getToast({ commit }, toast) {
    toast.color = toast.color || "error";
    toast.timeout = toast.timeout || 4000;
    commit("setToast", toast);
  },

  async deleteAccount({ dispatch }) {
    try {
      await this.$fire.auth.currentUser.delete();
      this.$router.push("/");
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async logout({ commit }) {
    try {
      await this.$fire.auth.signOut();
      commit("signOut");
      this.$router.push("/");
    } catch {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async login({ dispatch }, payload) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      dispatch("checkLogin");
      this.$router.push("/posts");
    } catch {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async checkLogin({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      await commit("getData", {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async register({ dispatch, state }, payload) {
    try {
      await this.$fire.auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      dispatch("checkLogin");
      const storageRef = this.$fire.storage.ref();
      this.$fire.auth.currentUser.updateProfile({
        displayName: payload.name,
      });
      const user = this.$fire.auth.currentUser;
      this.$fire.firestore.collection("user").doc(user.uid).set({
        uid: user.uid,
        name: payload.name,
        photoURL: user.photoURL,
        affiliation: "",
        job: "",
        prefectures: "",
        profileText: "",
      });

      this.$router.push("/auth/registerFinish");
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },

  async loginGoogle({ dispatch }) {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      await this.$fire.auth.signInWithPopup(provider).then(() => {
        dispatch("checkLogin");
        this.$router.push("/posts");
      });
      const user = this.$fire.auth.currentUser;

      const querySnapshot = await this.$fire.firestore
        .collection("user")
        .where("uid", "==", user.uid)
        .get();

      const selectUserData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        selectUserData.push(data);
      });

      if (typeof selectUserData[0] == "undefined") {
        const storageRef = this.$fire.storage.ref();
        storageRef.child(`users/${user.uid}.png`).put(user.photoURL);

        this.$fire.firestore.collection("user").doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          affiliation: "",
          job: "",
          prefectures: "",
          profileText: "",
        });
      }
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },

  async loginTwitter({ dispatch }) {
    try {
      const provider = new this.$fireModule.auth.TwitterAuthProvider();
      await this.$fire.auth.signInWithPopup(provider).then(() => {
        dispatch("checkLogin");
        this.$router.push("/posts");
      });

      const user = this.$fire.auth.currentUser;
      const querySnapshot = await this.$fire.firestore
        .collection("user")
        .where("uid", "==", user.uid)
        .get();

      const selectUserData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        selectUserData.push(data);
      });

      if (typeof selectUserData[0] == "undefined") {
        const storageRef = this.$fire.storage.ref();
        storageRef.child(`users/${user.uid}.png`).put(user.photoURL);

        this.$fire.firestore.collection("user").doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          affiliation: "",
          job: "",
          prefectures: "",
          profileText: "",
        });
      }
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async userData({ commit }, payload) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("user")
        .where("uid", "==", payload.uid)
        .get();

      const selectUserData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        selectUserData.push(data);
      });

      commit("setUserData", {
        uid: selectUserData[0].uid,
        name: selectUserData[0].name,
        photoURL: selectUserData[0].photoURL,
        affiliation: selectUserData[0].affiliation,
        job: selectUserData[0].job,
        prefectures: selectUserData[0].prefectures,
        profileText: selectUserData[0].profileText.replace(/\\n/g, "\n"),
      });
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async imageUpload({}, payload) {
    const storageRef = this.$fire.storage.ref();
    const userRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.uid);
    try {
      await storageRef
        .child(`users/${payload.uid}/${payload.uid}.png`)
        .put(payload.thumbnail)
        .then(() => {
          storageRef
            .child(`users/${payload.uid}/${payload.uid}.png`)
            .getDownloadURL()
            .then((url) => {
              this.$fire.auth.currentUser.updateProfile({
                // uid: payload.uid,
                photoURL: url,
              });
              userRef.update({
                photoURL: url,
              });
            });
        });
      // location.reload();
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async deleteImage({}, payload) {
    const storageRef = this.$fire.storage.ref();
    // const userRef = await this.$fire.firestore
    //   .collection("user")
    //   .doc(payload.uid);

    await storageRef.child(`users/${payload.uid}/${payload.uid}.png`).delete();
  },

  async deleteUserData({}, payload) {
    try {
      await this.$fire.firestore.collection("user").doc(payload.uid).delete();
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async updateUserData({}, payload) {
    const userRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.uid);

    try {
      await userRef.update({
        uid: payload.uid,
        name: payload.name,
        photoURL: payload.photoURL,
        affiliation: payload.affiliation,
        job: payload.job,
        prefectures: payload.prefectures,
        profileText: payload.profileText,
      });
      this.$fire.auth.currentUser.updateProfile({
        displayName: payload.name,
        photoURL: payload.photoURL,
      });
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
};

export const mutations = {
  // 追加
  setToast(state, payload) {
    state.toast = payload;
  },

  add(state, { uid, email, displayName, photoURL }) {
    state.user = {
      ...state.user,
      ...{
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      },
    };
  },
  getData(state, user) {
    state.user = user;
  },
  setUserData(state, data) {
    state.selectUserData = data;
  },
  selectProfile(state, { post }) {
    state.selectUserData = post;
  },
  signOut(state) {
    state.user.email = "";
    state.user.password = "";
    state.user.uid = "";
    state.user.name = "";
    state.user.photoURL = "";
  },
};
