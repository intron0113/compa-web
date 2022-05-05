export const state = () => ({
  user: {
    uid: "",
    email: "",
    name: "",
    photoURL: "",
  },
});

export const getters = {
  user: (state) => {
    return state.user;
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
                email: user.email,
                photoURL: user.photoURL,
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
        email: user.email,
        photoURL: user.photoURL,
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
        email: user.email,
        password: user.password,
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
};

export const mutations = {
  getData(state, user) {
    state.user = user;
  },
};
