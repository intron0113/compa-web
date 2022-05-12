import moment from "~/plugins/moment";

export const state = () => ({
  follows: [],
  userComments: [],
  youFollowing: [],
});

export const getters = {
  userComments: (state) => {
    return state.userComments;
  },
  youFollowing: (state) => {
    return state.youFollowing;
  },
};

export const mutations = {
  setUserComments(state, data) {
    state.userComments = data;
  },
  setData(state, data) {
    state.follows = data;
  },
  youFollowing(state, data) {
    state.youFollowing = data;
  },
};

export const actions = {
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
  async userFollows({ dispatch }, payload) {
    try {
      console.log(payload.followed_uid);
      this.$fire.auth.onAuthStateChanged((user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          const { followed_uid } = payload;
          console.log(uid);
          console.log(followed_uid);
          dispatch("getUser", { followed_uid, uid });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getUser({ commit }, payload) {
    try {
      console.log(payload);

      const querySnapshot = await this.$fire.firestore
        .collection("follows")
        .where("following_uid", "==", payload.uid)
        .where("followed_uid", "==", payload.followed_uid)
        .get();

      const userFollows = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        userFollows.push(data);
      });
      // for (let i = 0; i < userPosts.length; i++) {
      //   const post = userPosts[i];
      //   const userQuerySnapshot = await this.$fire.firestore
      //     .collection("user")
      //     .where("uid", "==", post.uid)
      //     .get();
      //   userQuerySnapshot.forEach((doc) => {
      //     const userData = doc.data();

      //     post.name = userData.name;
      //     post.photoURL = userData.photoURL;
      //   });
      // }
      const { followId, follow_status, followed_uid, following_uid } =
        userFollows[0];
      console.log(followId);
      commit("youFollowing", {
        followId: followId,
        follow_status: follow_status,
        followed_uid: followed_uid,
        following_uid: following_uid,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async unFollow({ dispatch }, payload) {
    const collection = this.$fire.firestore.collection("follows");

    try {
      await collection.doc(payload.followId).delete();
      dispatch("getFollows");
      location.reload();
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
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
        follow_status: true,
      });
      // console.log(uid);
      // console.log(title);
      // console.log(body);
      dispatch("getFollows");
      location.reload();
    } catch (error) {
      // console.log(title);
      console.log(error); //eslint-disable-line
      console.log(payload); //eslint-disable-line
    }
  },
  async getFollows({ commit }) {
    try {
      const user = this.$fire.auth.currentUser;
      // console.log(payload);
      const querySnapshot = await this.$fire.firestore
        .collection("follows")
        // .where("following_uid", "==", user.uid)
        .get();
      const follows = [];
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data();
      //   console.log(data);
      //   posts.push(data);
      // });
      // commit("setData", posts);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        follows.push(data);
      });

      // for (let i = 0; i < follows.length; i++) {
      //   const follow = follows[i];
      //   const userQuerySnapshot = await this.$fire.firestore
      //     .collection("user")
      //     .where("uid", "==", follow.uid)
      //     .get();
      //   userQuerySnapshot.forEach((doc) => {
      //     const userData = doc.data();

      //     follow.name = userData.name;
      //     follow.photoURL = userData.photoURL;
      //   });
      // }
      console.log(follows);

      commit("setData", follows);
    } catch (error) {
      console.log(error);
    }
  },
};
