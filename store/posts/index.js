import moment from "~/plugins/moment";

export const state = () => ({
  posts: [],
  userPosts: [],
  selectPost: {
    body: "",
    name: "",
    photoURL: "",
    postId: "",
    time: "",
    title: "",
    uid: "",
  },
  toast: {
    msg: null,
    color: "error",
    timeout: 4000,
  },
});

export const getters = {
  posts: (state) => {
    return state.posts;
  },
  userPosts: (state) => {
    return state.userPosts;
  },
  selectPost: (state) => {
    return state.selectPost;
  },

  selectTitle: (state, getters) => {
    return getters.selectPost.forEach((selectPost) => selectPost.title);
  },
};

export const mutations = {
  addPost(state, { post }) {
    state.posts = post;
  },
  updatePost(state, { post }) {
    state.posts = state.posts.map((p) => (p.id === post.id ? post : p));
  },
  clearPosts(state) {
    state.posts = [];
  },

  setData(state, data) {
    state.posts = data;
  },

  setPost(state, data) {
    state.selectPost = data;
  },
  setUserPosts(state, data) {
    state.userPosts = data;
  },
  setToast(state, payload) {
    state.toast = payload;
  },
  // loginStatusChange(state, status) {
  //   // 認証状態を双方向に変化
  //   state.loggedIn = status;
  // },
};

export const actions = {
  // トーストデータをセットする
  getToast({ commit }, toast) {
    toast.color = toast.color || "error";
    toast.timeout = toast.timeout || 4000;
    commit("setToast", toast);
  },
  async fetchMembers({ commit }, payload) {
    return commit("setPost", payload);
  },

  async fetchPost({ commit }, { uid }) {
    const post = await this.$axios.$get(`/posts/${uid}.json`);
    commit("addPost", { poFFFFFFst: { ...post, uid } });
  },

  async userPosts({ commit }, uid) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .where("uid", "==", uid.uid)
        .orderBy("time", "desc")
        .get();

      const userPosts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userPosts.push(data);
      });
      for (let i = 0; i < userPosts.length; i++) {
        const post = userPosts[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", post.uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          post.name = userData.name;
          post.photoURL = userData.photoURL;
        });
      }

      commit("setUserPosts", userPosts);

      // selectPost.push(data);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
  async getPost({ commit }, payload) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .where("postId", "==", payload.postId)
        .get();

      const selectPost = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        selectPost.push(data);
      });

      for (let i = 0; i < selectPost.length; i++) {
        const post = selectPost[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", post.uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          post.name = userData.name;
          post.photoURL = userData.photoURL;
        });
      }
      const selectPosts = selectPost.slice(0, 1);
      commit("setPost", {
        body: selectPost[0].body,
        name: selectPost[0].name,
        photoURL: selectPost[0].photoURL,
        postId: selectPost[0].postId,
        tags: selectPost[0].tags,
        time: selectPost[0].time,
        title: selectPost[0].title,
        uid: selectPost[0].uid,
      });
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
  async fetchPosts({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .orderBy("time", "desc")
        .get();

      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push(data);
      });
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", post.uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          post.name = userData.name;
          post.photoURL = userData.photoURL;
        });
      }

      commit("setData", posts);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },

  async allDeletePost({ dispatch }, payload) {
    try {
      const collection = await this.$fire.firestore
        .collection("posts")
        .where("uid", "==", payload.uid)
        .get();

      const posts = [];
      collection.forEach((doc) => {
        const data = doc.data();
        posts.push(data);
      });
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        await this.$fire.firestore
          .collection("posts")
          .doc(post.postId)
          .delete();
      }
      dispatch("getPosts");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
  async deletePost({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("posts");

    try {
      await collection.doc(payload.postId).delete();
      dispatch("getPosts");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
  async updatePost({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("posts");
    const userRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.uid);
    try {
      await collection.doc(payload.postId).update({
        postId: payload.postId,
        uid: payload.uid,
        title: payload.title,
        tags: payload.tags,
        body: payload.body,
        time: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      dispatch("getPosts");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
  async publishPost({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("posts");
    const newId = collection.doc().id;
    const userRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.uid);

    try {
      await collection.doc(newId).set({
        postId: newId,
        photoURL: userRef,
        name: userRef,
        uid: payload.uid,
        tags: payload.tags,
        title: payload.title,
        body: payload.body,
        time: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      dispatch("getPosts");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
  async getPosts({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .where("uid", "==", user.uid)
        .get();
      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push(data);
      });

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", post.uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          post.name = userData.name;
          post.photoURL = userData.photoURL;
        });
      }

      commit("setData", posts);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理できませんでした" });
    }
  },
};
