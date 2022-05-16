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
};

export const actions = {
  async fetchMembers({ commit }, payload) {
    return commit("setPost", payload);
  },

  async fetchPost({ commit }, { uid }) {
    const post = await this.$axios.$get(`/posts/${uid}.json`);
    commit("addPost", { poFFFFFFst: { ...post, uid } });
  },

  async userPosts({ commit }, uid) {
    try {
      console.log(uid.uid);
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .where("uid", "==", uid.uid)
        .orderBy("time", "desc")
        .get();

      const userPosts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
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
        .orderBy("time", "desc")
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

  async deletePost({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("posts");

    try {
      await collection.doc(payload.postId).delete();
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
  async getPosts({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      console.log(user.uid);
      const querySnapshot = await this.$fire.firestore
        .collection("posts")
        .where("uid", "==", user.uid)
        .get();
      const posts = [];
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data();
      //   console.log(data);
      //   posts.push(data);
      // });
      // commit("setData", posts);
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
      console.log(posts);

      commit("setData", posts);
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
