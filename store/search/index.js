import * as algoliasearch from "algoliasearch";
import config from "~/alogolia.config.js";

const client = algoliasearch(config.appId, config.apiKey);
const index = client.initIndex("compa");

export const state = () => ({
  searchLists: [],
  qWord: "",
});

export const getters = {
  searchLists: (state) => {
    return state.searchLists;
  },
  qWord: (state) => {
    return state.qWord;
  },
};

export const mutations = {
  setLists(state, data) {
    state.searchLists = data;
  },
  setQWord(state, data) {
    state.qWord = data.searchWord;
  },
  commitQWord(state, data) {
    state.qWord = data.searchWord;
  },
};

export const actions = {
  async getLists({ commit }, payload) {
    // let searchResult = await index.search("");
    let searchResult = await index.search(payload.searchWord);

    // const userFollows = [];
    // searchResult.hits.forEach((doc) => {
    //   const data = doc.data();
    //   userFollows.push(data);
    // });

    for (let i = 0; i < searchResult.hits.length; i++) {
      const userFollow = searchResult.hits[i];
      const userQuerySnapshot = await this.$fire.firestore
        .collection("user")
        .where("uid", "==", userFollow.uid)
        .get();
      userQuerySnapshot.forEach((doc) => {
        const userData = doc.data();

        userFollow.name = userData.name;
        userFollow.photoURL = userData.photoURL;
      });
    }

    return commit("setLists", searchResult.hits);
  },
};
