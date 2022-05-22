<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="6" md="7" class="d-none d-sm-block">
            <div
              class="v-input mx-2 mx-md-4 v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed v-text-field--placeholder rounded-lg"
              style="max-width: 450px"
              data-v-7f162986=""
            >
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-input__prepend-inner">
                    <span
                      aria-hidden="true"
                      class="v-icon notranslate ml-1 mr-2 theme--light"
                      data-v-7f162986=""
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-hidden="true"
                        class="v-icon__svg"
                      >
                        <path
                          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                        /></svg
                    ></span>
                  </div>
                  <div class="v-text-field__slot">
                    <input
                      id="input-18"
                      v-model="qWord"
                      autocomplete="off"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      placeholder="compa内検索"
                      type="text"
                      value=""
                      @keyup.enter="say($event.target)"
                      @keypress="setCanMessageSubmit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <v-suheader>{{ post }}</v-suheader>
          </v-col>
          <!-- <v-col cols="12">
            <select>
              <option>新しい順</option>
              <option>古い順</option>
            </select>
          </v-col> -->
          <v-col cols="12">
            <v-card class="px-5">
              <v-col clos="12">
                <v-subheader>投稿記事</v-subheader>
              </v-col>

              <v-list two-line>
                <v-card
                  v-for="post in searchLists"
                  :key="post.objectID"
                  :title="post.title"
                >
                  <v-list-item @click="openUser(post, index)">
                    <img
                      v-if="!!post.photoURL"
                      :src="post.photoURL"
                      alt="プロフィール画像"
                      class="image icon icon-user"
                    />
                    <img
                      v-else
                      src="/atoms/icons/user.jpg"
                      alt="プロフィール画像"
                      class="image icon icon-user"
                    />
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ post.name }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        <!-- {{ postedDay(post.time) }}に投稿 -->
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item three-line @click="openPost(post, index)">
                    <v-list-item-content>
                      <v-list-item-title class="text-h5 mb-1">
                        {{ post.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-list>
              <v-col cols="12">
                <v-content>
                  <v-pagination
                    v-model="page"
                    :length="length"
                    class="pagination-more-width:400px"
                    @input="pageChange"
                  />
                </v-content>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as algoliasearch from "algoliasearch";
import config from "~/alogolia.config.js";

const client = algoliasearch(config.appId, config.apiKey);
const index = client.initIndex("compa");
export default {
  layout: "after-login",
  middleware: "auth",
  async asyncData({ store }) {
    await store.dispatch("posts/fetchPosts");
    let searchResult = await index.search("");
    return {
      todoList: searchResult.hits,
    };
  },
  data: () => ({
    post: "投稿記事",
    drawer: null,
    show: false,
    page: 1,
    length: 0,
    displayLists: [],
    pageSize: 10,
    query: "",
    todoList: [],
  }),
  computed: {
    posts() {
      return this.$store.getters["posts/posts"];
    },
    searchLists() {
      return this.$store.getters["search/searchLists"];
    },
    qWord: {
      get() {
        // return Object.assign({}, this.$store.getters["search/qWord"]);
        return this.$store.getters["search/qWord"];
      },
      set(value) {
        this.$store.commit("search/commitQWord", value);
      },
    },
  },

  mounted() {
    this.length = Math.ceil(this.posts.length / this.pageSize);
    this.displayLists = this.posts.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
    console.log(this.displayLists);
  },
  methods: {
    setCanMessageSubmit() {
      this.canMessageSubmit = true;
    },

    pageChange(pageNumber) {
      this.displayLists = this.posts.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    handleClick(post) {
      this.$router.push(`/posts/${post.id}`);
    },
    openPost(post) {
      // this.$store.dispatch("posts/getPost", {
      //   postId: post.postId,
      //   uid: post.uid,
      // });
      this.$router.push(`/users/${post.uid}/${post.postId}`);
    },
    openUser(post) {
      // this.$store.dispatch("posts/getPost", {
      //   postId: post.postId,
      //   uid: post.uid,
      // });
      this.$router.push(`/users/${post.uid}`);
    },
    postedDay(timestamp) {
      // return timestamp.toDate().toLocaleString("ja-JP");
    },
    say(target) {
      if (!this.canMessageSubmit) {
        return;
      }

      // -- submit message -- //
      this.$store.dispatch("search/getLists", {
        searchWord: target.value,
      });
      this.$store.commit("search/setQWord", {
        searchWord: target.value,
      });
      this.$router.push(`/posts/search/${target.value}`);
      // this.$router.push(`/posts/${target.value}`);
      // this.$router.push("/login/serch");
      // this.message = "";
      target.value = "";
      this.canMessageSubmit = false;
    },
  },
};
</script>
<style lang="scss">
.button {
  text-align: center;
  margin: 30px 0;
}
.posts-page .el-table__row {
  cursor: pointer;
}

.icon-user {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 32px;
  min-width: 32px;
  height: 32px;
  overflow: hidden;
  margin-right: 10px;

  > .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
