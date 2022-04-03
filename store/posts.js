import moment from "~/plugins/moment";

export const state = () => ({
  posts: [],

  // posts.js
  todos: [],
});

export const getters = {
  posts: (state) => {
    return state.posts;
  },
  // posts.js
  todos: (state) => {
    return state.todos;
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

  // posts.js

  setData(state, data) {
    state.todos = data;
  },
};

export const actions = {
  async fetchPost({ commit }, { id }) {
    const post = await this.$axios.$get(`/posts/${id}.json`);
    commit("addPost", { post: { ...post, id } });
  },
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(`/posts.json`);
    commit("clearPosts");
    Object.entries(posts || [])
      .reverse()
      .forEach(([id, content]) =>
        commit("addPost", {
          post: {
            id,
            ...content,
          },
        })
      );
  },
  async publishPost({ commit }, { payload }) {
    const user = await this.$axios.$get(`/users/${payload.user.id}.json`);
    const created_at = this.$moment().format();
    payload = {
      created_at,
      ...payload,
    };
    const post_id = (await this.$axios.$post("/posts.json", payload)).name;
    const post = { id: post_id, ...payload, created_at };
    const putData = { id: post_id, ...payload, created_at };
    delete putData.user;
    await this.$axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData,
    ]);
    commit("addPost", { post });
  },
  async addLikeToPost({ commit }, { user, post }) {
    post.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id,
    });
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post);
    commit("updatePost", { post: newPost });
  },
  async removeLikeToPost({ commit }, { user, post }) {
    post.likes = post.likes.filter((like) => like.user_id !== user.id) || [];
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post);
    commit("updatePost", { post: newPost });
  },

  // posts.js

  async submitTask({ dispatch }, { task, uid }) {
    try {
      await this.$fire.firestore.collection("task").doc().set({
        task,
        uid,
      });
      dispatch("getData");
    } catch (error) {
      console.log(error); //eslint-disable-line
    }
  },
  async getData({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      console.log(user.uid);
      const querySnapshot = await this.$fire.firestore
        .collection("task")
        .where("uid", "==", user.uid)
        .get();
      const todos = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        todos.push(data);
      });
      commit("setData", todos);
    } catch (error) {
      console.log(error);
    }
  },
};
