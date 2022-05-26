export const state = () => ({
  // loggedIn: false,
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
      // commit("signOut");
      // window.localStorage.clear();
      this.$router.push("/");
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async logout({ commit }) {
    try {
      await this.$fire.auth.signOut();
      commit("signOut");
      // window.localStorage.clear();
      this.$router.push("/");
    } catch (error) {
      console.log(error); //eslint-disable-line
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
    } catch (error) {
      // console.log(error); //eslint-disable-line
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async checkLogin({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      // commit("loginStateChange", true);
      await commit("getData", {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log(user);
    } catch (error) {
      console.log(error); //eslint-disable-line
    }
  },
  async register({ dispatch, state }, payload) {
    try {
      await this.$fire.auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      dispatch("checkLogin");
      // this.$router.push("/auth/registerFinish");
      const storageRef = this.$fire.storage.ref();
      // storageRef
      //   .child(`users/${state.user.uid}.png`)
      //   .put(payload.thumbnail)
      // .then(() => {
      // storageRef
      //   .child(`users/${state.user.uid}.png`)
      //   .getDownloadURL()
      //   .then((url) => {
      this.$fire.auth.currentUser.updateProfile({
        displayName: payload.name,
        // photoURL: url,
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
      // });
      // });
      this.$router.push("/auth/registerFinish");
    } catch (error) {
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async registerGoogle({ dispatch }) {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      await this.$fire.auth.signInWithPopup(provider).then(() => {
        dispatch("checkLogin");
        this.$router.push("/posts");
      });
      const user = this.$fire.auth.currentUser;

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
    } catch (error) {
      // console.log(error); //eslint-disable-line
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
    } catch (error) {
      // console.log(error); //eslint-disable-line
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async registerTwitter({ dispatch }) {
    try {
      const provider = new this.$fireModule.auth.TwitterAuthProvider();
      await this.$fire.auth.signInWithPopup(provider).then(() => {
        dispatch("checkLogin");
        this.$router.push("/posts");
      });
      const user = this.$fire.auth.currentUser;
      this.$fire.firestore.collection("user").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        password: user.password,
        affiliation: "",
        job: "",
        prefectures: "",
        profileText: "",
      });
    } catch (error) {
      // console.log(error); //eslint-disable-line
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
    } catch (error) {
      // console.log(error); //eslint-disable-line
      dispatch("getToast", { msg: "ユーザー情報が正しくありません" });
    }
  },
  async userData({ commit }, payload) {
    try {
      console.log(payload.uid);
      const querySnapshot = await this.$fire.firestore
        .collection("user")
        .where("uid", "==", payload.uid)
        .get();

      const selectUserData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        selectUserData.push(data);
      });

      console.log(selectUserData[0]);
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
      console.log(error);
    }
  },
  async imageUpload({}, payload) {
    const storageRef = this.$fire.storage.ref();
    const userRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.uid);
    console.log(payload);
    try {
      await storageRef
        .child(`users/${payload.uid}/${payload.uid}.png`)
        .put(payload.thumbnail)
        .then(() => {
          storageRef
            .child(`users/${payload.uid}/${payload.uid}.png`)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
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
      console.log(error); //eslint-disable-line
    }
  },
  async deleteImage({}, payload) {
    const storageRef = this.$fire.storage.ref();
    // const userRef = await this.$fire.firestore
    //   .collection("user")
    //   .doc(payload.uid);
    // console.log(payload);

    await storageRef.child(`users/${payload.uid}/${payload.uid}.png`).delete();
  },

  async deleteUserData({}, payload) {
    try {
      await this.$fire.firestore.collection("user").doc(payload.uid).delete();
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
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
      console.log(payload);
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
    }
  },
};

export const mutations = {
  // 追加
  setToast(state, payload) {
    state.toast = payload;
  },
  // loginStatusChange(state, status) {
  //   // 認証状態を双方向に変化
  //   state.loggedIn = status;
  // },
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
    // state.user.login = false
  },
};
