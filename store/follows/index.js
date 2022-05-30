import moment from "~/plugins/moment";

export const state = () => ({
  follows: [],
  userComments: [],
  youFollowing: [],
  loginUserLists: [],
  followLists: [],
  followerLists: [],
  toast: {
    msg: null,
    color: "error",
    timeout: 4000,
  },
});

export const getters = {
  userComments: (state) => {
    return state.userComments;
  },
  youFollowing: (state) => {
    return state.youFollowing;
  },
  loginUserLists: (state) => {
    return state.loginUserLists;
  },
  followLists: (state) => {
    return state.followLists;
  },
  followerLists: (state) => {
    return state.followerLists;
  },
};

export const mutations = {
  // 追加
  setToast(state, payload) {
    state.toast = payload;
  },
  setUserComments(state, data) {
    state.userComments = data;
  },
  setData(state, data) {
    state.follows = data;
  },
  youFollowing(state, data) {
    state.youFollowing = data;
  },
  loginUserLists(state, data) {
    state.loginUserLists = data;
  },
  followLists(state, data) {
    state.followLists = data;
  },
  followerLists(state, data) {
    state.followerLists = data;
  },
};

export const actions = {
  // トーストデータをセットする
  getToast({ commit }, toast) {
    toast.color = toast.color || "error";
    toast.timeout = toast.timeout || 4000;
    commit("setToast", toast);
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
  async userFollows({ dispatch }, payload) {
    try {
      this.$fire.auth.onAuthStateChanged((user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          const { route_uid } = payload;
          dispatch("getUser", { route_uid, uid });
          dispatch("getLoginUserFollowList", { route_uid, uid });
          dispatch("getFollowList", { route_uid, uid });
          dispatch("getFollowerList", { route_uid, uid });
        }
      });
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },

  async getUser({ commit }, payload) {
    const querySnapshot = await this.$fire.firestore
      .collection("follows")
      .where("following_uid", "==", payload.uid)
      .where("followed_uid", "==", payload.route_uid)
      .get();

    const userFollows = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      userFollows.push(data);
    });

    if (userFollows.length == 0) {
      userFollows.push({
        followId: null,
        followed_uid: null,
        following_uid: null,
      });
    }

    const { followId, followed_uid, following_uid } = userFollows[0];

    commit("youFollowing", {
      followId: followId,
      followed_uid: followed_uid,
      following_uid: following_uid,
    });
  },
  async getLoginUserFollowList({ commit }, payload) {
    const querySnapshot = await this.$fire.firestore
      .collection("follows")
      .where("following_uid", "==", payload.uid)
      .get();

    const userFollows = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      userFollows.push(data);
    });

    if (userFollows.length == 0) {
      userFollows.push({
        followId: null,
        followed_uid: null,
        following_uid: null,
      });
    }

    // const { followId, followed_uid, following_uid } = userFollows[0];

    commit("loginUserLists", userFollows);
  },
  async getFollowList({ commit }, payload) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("follows")
        .where("following_uid", "==", payload.route_uid)
        .get();

      const userFollows = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userFollows.push(data);
      });

      for (let i = 0; i < userFollows.length; i++) {
        const userFollow = userFollows[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", userFollow.followed_uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          userFollow.name = userData.name;
          userFollow.photoURL = userData.photoURL;
        });
      }
      commit("followLists", userFollows);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async getFollowerList({ commit }, payload) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("follows")
        .where("followed_uid", "==", payload.route_uid)
        .get();

      const userFollowers = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userFollowers.push(data);
      });
      for (let i = 0; i < userFollowers.length; i++) {
        const userFollower = userFollowers[i];
        const userQuerySnapshot = await this.$fire.firestore
          .collection("user")
          .where("uid", "==", userFollower.following_uid)
          .get();
        userQuerySnapshot.forEach((doc) => {
          const userData = doc.data();

          userFollower.name = userData.name;
          userFollower.photoURL = userData.photoURL;
        });
      }

      commit("followerLists", userFollowers);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },

  async allDeleteFollows({ dispatch }, payload) {
    try {
      const collection = await this.$fire.firestore
        .collection("follows")
        .where("following_uid", "==", payload.uid)
        .get();

      const follows = [];
      collection.forEach((doc) => {
        const data = doc.data();
        follows.push(data);
      });
      for (let i = 0; i < follows.length; i++) {
        const follow = follows[i];
        await this.$fire.firestore
          .collection("follows")
          .doc(follow.followId)
          .delete();
      }

      const followerCollection = await this.$fire.firestore
        .collection("follows")
        .where("followed_uid", "==", payload.uid)
        .get();

      const followers = [];
      followerCollection.forEach((doc) => {
        const data = doc.data();
        followers.push(data);
      });
      for (let i = 0; i < followers.length; i++) {
        const follower = followers[i];
        await this.$fire.firestore
          .collection("follows")
          .doc(follower.followId)
          .delete();
      }

      dispatch("getFollows");
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },

  async followerCut({ dispatch }, payload) {
    try {
      const querySnapshot = await this.$fire.firestore
        .collection("follows")
        .where("following_uid", "==", payload.following_uid)
        .where("followed_uid", "==", payload.followed_uid)
        .get();

      const userFollows = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        userFollows.push(data);
      });

      const { followId, followed_uid, following_uid } = userFollows[0];

      await this.$fire.firestore.collection("follows").doc(followId).delete();
      dispatch("getFollows");
      location.reload();
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },

  async unFollow({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("follows");

    try {
      await collection.doc(payload.followId).delete();
      dispatch("getFollows");
      location.reload();
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },

  async follow({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("follows");
    const newId = collection.doc().id;
    const followUserRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.following_uid);
    const followerUserRef = await this.$fire.firestore
      .collection("user")
      .doc(payload.followed_uid);

    try {
      await collection.doc(newId).set({
        followId: newId,
        following_uid: payload.following_uid,
        // following_photoURL: followUserRef,
        // following_name: followUserRef,
        followed_uid: payload.followed_uid,
        // followed_photoURL: followerUserRef,
        // followed_name: followerUserRef,
        // follow_status: true,
      });
      dispatch("getFollows");
      location.reload();
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
  async getFollows({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      const querySnapshot = await this.$fire.firestore
        .collection("follows")
        .get();
      const follows = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        follows.push(data);
      });

      commit("setData", follows);
    } catch (error) {
      dispatch("getToast", { msg: "正しく処理ができませんでした。" });
    }
  },
};
