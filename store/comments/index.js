import moment from "~/plugins/moment";

export const state = () => ({
  comments: [],
  userComments: [],
  selectPost: {
    body: "",
    name: "",
    photoURL: "",
    postId: "",
    time: "",
    title: "",
    uid: "",
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
  async fetchMembers({ commit }, payload) {
    return commit("setPost", payload);
  },

  async fetchPost({ commit }, { uid }) {
    const post = await this.$axios.$get(`/posts/${uid}.json`);
    commit("addPost", { poFFFFFFst: { ...post, uid } });
  },

  async commentLists({ commit }, uid) {
    try {
      console.log(uid.postID);
      const querySnapshot = await this.$fire.firestore
        .collection("comments")
        .where("postId", "==", uid.postID)
        .orderBy("time")
        .get();

      const userComments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
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
      console.log(userComments);
      commit("setUserComments", userComments);

      // selectPost.push(data);
      // console.log(selectPost);
    } catch (error) {
      console.log(error);
    }
  },
  async getPost({ commit }, payload) {
    try {
      console.log(payload.postId);
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .where("postId", "==", payload.postId)
        .get();

      const selectPost = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
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
      console.log(selectPost[0]);
      const selectPosts = selectPost.slice(0, 1);
      console.log(selectPosts);
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
      console.log(error);
    }
  },
  async fetchPosts({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      // console.log(user.uid);
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        // .where("uid", "==", user.uid)
        .get();

      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
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
      console.log(error);
    }
  },

  async deleteComment({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("comments");

    try {
      await collection.doc(payload.commentId).delete();
      // console.log(uid);
      // console.log(title);
      // console.log(body);
      dispatch("getComments");
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
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
      // console.log(uid);
      // console.log(title);
      // console.log(body);
      dispatch("getPosts");
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
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
        commentBody: payload.commentBody,
        time: this.$fireModule.firestore.FieldValue.serverTimestamp(),
      });
      // console.log(uid);
      // console.log(title);
      // console.log(body);
      dispatch("getComments");
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
    }
  },
  async getComments({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      console.log(user.uid);
      const querySnapshot = await this.$fire.firestore
        .collection("comments")
        .where("uid", "==", user.uid)
        .get();
      const comments = [];
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data();
      //   console.log(data);
      //   posts.push(data);
      // });
      // commit("setData", posts);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
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
      console.log(comments);

      commit("setData", comments);
    } catch (error) {
      console.log(error);
    }
  },
  // async addLikeToPost({ commit }, { user, post }) {
  //   post.likes.push({
  //     created_at: moment().format(),
  //     user_id: user.id,
  //     post_id: post.id,
  //   });
  //   const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post);
  //   commit("updatePost", { post: newPost });
  // },
  // async removeLikeToPost({ commit }, { user, post }) {
  //   post.likes = post.likes.filter((like) => like.user_id !== user.id) || [];
  //   const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post);
  //   commit("updatePost", { post: newPost });
  // },
};
