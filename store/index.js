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
  async login({ dispatch }, payload) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      dispatch("checkLogin");
      this.$router.push("/posts");
    } catch (error) {
      console.log(error); //eslint-disable-line
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
      storageRef
        .child(`users/${state.user.uid}.png`)
        .put(payload.thumbnail)
        .then(() => {
          storageRef
            .child(`users/${state.user.uid}.png`)
            .getDownloadURL()
            .then((url) => {
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
            });
        });
      this.$router.push("/auth/registerFinish");
      console.log(user);
    } catch (error) {
      console.log(error); //eslint-disable-line
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
      console.log(error); //eslint-disable-line
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
      console.log(error); //eslint-disable-line
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
      console.log(error); //eslint-disable-line
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
      console.log(error); //eslint-disable-line
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
  async updateUserData({ dispatch }, payload) {
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
      console.log(payload);
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
    }
  },
};

export const mutations = {
  getData(state, user) {
    state.user = user;
  },
  setUserData(state, data) {
    state.selectUserData = data;
  },
  selectProfile(state, { post }) {
    state.selectUserData = post;
  },
};
