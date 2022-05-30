import moment from "~/plugins/moment";

export const state = () => ({
  comments: [],
  userComments: [],
  selectPost: {
    body: "",
    name: "",
    photoURL: "",
    postId: "",
    postUid: "",
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
  userComments: (state) => {
    return state.userComments;
  },
  selectPost: (state) => {
    return state.selectPost;
  },

  selectTitle: (state, getters) => {
    return getters.selectPost.forEach((selectPost) => selectPost.title);
  },
};

export const mutations = {
  // 追加
  setToast(state, payload) {
    state.toast = payload;
  },
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
    state.comments = data;
  },

  setPost(state, data) {
    state.selectPost = data;
  },
  setUserComments(state, data) {
    state.userComments = data;
  },
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

  async commentLists({ commit }, uid) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("comments")
        .where("postId", "==", uid.postID)
        .orderBy("time")
        .get();

      const userComments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userComments.push(data);
      });
      for (let i = 0; i < userComments.length; i++) {
        const comment = userComments[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", comment.uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          comment.name = userData.name;
          comment.photoURL = userData.photoURL;
          comment.commentBody = comment.commentBody.replace(/\\n/g, "\n");
        });
      }
      commit("setUserComments", userComments);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
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
        time: selectPost[0].time,
        title: selectPost[0].title,
        uid: selectPost[0].uid,
      });
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async fetchPosts({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        // .where("uid", "==", user.uid)
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
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },

  async allDeleteComments({ dispatch }, payload) {
    try {
      const collection = await this.$fire.firestore
        .collection("comments")
        .where("postUid", "==", payload.uid)
        .get();

      const comments = [];
      collection.forEach((doc) => {
        const data = doc.data();
        comments.push(data);
      });
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        await this.$fire.firestore
          .collection("comments")
          .doc(comment.commentId)
          .delete();
      }
      dispatch("getComments");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async deletePostComments({ dispatch }, payload) {
    try {
      const collection = await this.$fire.firestore
        .collection("comments")
        .where("postId", "==", payload.postId)
        .get();
      const comments = [];
      collection.forEach((doc) => {
        const data = doc.data();
        comments.push(data);
      });

      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        await this.$fire.firestore
          .collection("comments")
          .doc(comment.commentId)
          .delete();
      }

      dispatch("getComments");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async deleteComment({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("comments");

    try {
      await collection.doc(payload.commentId).delete();
      location.reload();
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
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
        photoURL: userRef.photoURL,
        name: userRef.name,
        uid: payload.uid,
        title: payload.title,
        body: payload.body,
        time: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      dispatch("getPosts");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async publishComment({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("comments");
    const newId = collection.doc().id;
    const userRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.uid);

    try {
      await collection.doc(newId).set({
        commentId: newId,
        uid: payload.uid,
        name: userRef,
        photoURL: userRef,
        postId: payload.postId,
        postUid: payload.postUid,
        commentBody: payload.commentBody,
        time: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      await dispatch("getComments");
      location.reload();
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async getComments({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      const querySnapshot = await this.$fire.firestore
        .collection("comments")
        .where("uid", "==", user.uid)
        .get();
      const comments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        comments.push(data);
      });

      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", comment.uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          comment.name = userData.name;
          comment.photoURL = userData.photoURL;
        });
      }

      commit("setData", comments);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
};
