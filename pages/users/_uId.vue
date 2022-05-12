<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12" sm="4">
            <v-col cols="12">
              <v-card>
                <v-col cols="12">
                  <v-row
                    justify="space-around"
                    align-content="center"
                    style="height: 100px"
                  >
                    <IconUser
                      :image="selectUserData.photoURL"
                      style="width: 72px; height: 72px"
                    />
                  </v-row>
                </v-col>
                <v-card-text class="justify-center">
                  <v-row>
                    <v-col col="12">
                      <div>{{ selectUserData.name }}</div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text class="justify-center">
                  <v-row>
                    <v-col col="6">
                      <a href="/intron0113/following_users" class="css-1it6av2"
                        ><br />フォロー</a
                      >
                    </v-col>
                    <v-col col="6">
                      <a href="/intron0113/followers" class="css-1it6av2"
                        ><br />フォロワー</a
                      >
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions
                  v-if="watchUser == selectUserData.uid"
                  class="justify-center"
                >
                  <v-btn
                    block
                    large
                    color="accent"
                    class="mt-4 font-weight-bold"
                    @click="openSettings(selectUserData)"
                  >
                    設定
                  </v-btn>
                </v-card-actions>
                <v-card-actions v-else class="justify-center">
                  <v-btn
                    v-if="!youFollowing.follow_status"
                    block
                    large
                    color="green"
                    class="mt-4 font-weight-bold"
                    @click="follow(selectUserData)"
                  >
                    フォロー
                  </v-btn>
                  <v-btn
                    v-else
                    block
                    large
                    color="red"
                    class="mt-4 font-weight-bold"
                    @click="unFollow(youFollowing)"
                  >
                    フォロー解除
                  </v-btn>
                </v-card-actions>
                <div>{{ selectUserData.affiliation }}</div>
                <div>{{ selectUserData.job }}</div>
                <div>{{ selectUserData.prefectures }}</div>
                <div v-html="$md.render(selectUserData.profileText)" />
              </v-card>
            </v-col>
          </v-col>
          <v-col cols="12" sm="8">
            <v-col cols="12">
              <v-card class="px-5">
                <v-col cols="12">
                  <v-suheader>{{ post }}</v-suheader>
                </v-col>

                <v-list two-line>
                  <v-card v-for="post in postLists" :key="post.index">
                    <v-row>
                      <v-col @click="openPost(post, index)">
                        <!-- <v-card @click="openPost(post, index)"> -->
                        <v-row>
                          <v-col class="mx-3" cols="12" lg="8">
                            <v-list-item-content>
                              <v-list-item-subtitle>
                                投稿日 {{ postedDay(post.time) }}
                              </v-list-item-subtitle>
                              <v-list-item-title>
                                {{ post.title }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-col>
                        </v-row>
                        <!-- </v-list-item> -->
                        <!-- <v-list-item> -->
                        <!-- </v-card> -->
                      </v-col>
                      <v-col class="mb-4" cols="12" lg="4">
                        <v-btn
                          v-if="watchUser == selectUserData.uid"
                          class="mx-3 z-index:100"
                          @click="editPost(post, index)"
                        >
                          編集
                        </v-btn>
                        <v-btn
                          v-if="watchUser == selectUserData.uid"
                          class="mx-3"
                          @click="deletePost(post)"
                        >
                          削除
                        </v-btn>
                      </v-col>
                    </v-row>
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
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "after-login",
  middleware: "auth",
  async asyncData({ store, route, error }) {
    const id = route.params;
    try {
      await store.dispatch("follows/userFollows", {
        followed_uid: id.uid,
      });
      await store.dispatch("posts/userPosts", id);
      await store.dispatch("userData", {
        uid: id.uid,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    tab: "archive",
    post: "投稿した記事",
    event: "参加イベント",
    drawer: null,
    show: false,
    page: 1,

    length: 0,

    postLists: [],

    pageSize: 5,
    imgSrc: "",
    followStatus: true,
  }),
  computed: {
    watchUser() {
      return this.$store.getters.user.uid;
    },
    name() {
      return this.$store.getters.user.name;
    },
    photoURL() {
      return this.$store.getters.user.photoURL;
    },
    userPosts() {
      return this.$store.getters["posts/userPosts"];
    },
    youFollowing() {
      return this.$store.getters["follows/youFollowing"];
    },
    selectUserData() {
      return this.$store.getters["selectUserData"];
    },
  },
  mounted() {
    this.length = Math.ceil(this.userPosts.length / this.pageSize);
    this.postLists = this.userPosts.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
    console.log(this.postLists);
  },
  methods: {
    openSettings(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/settings`);
    },
    pageChange(pageNumber) {
      this.postLists = this.userPosts.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    editPost(post) {
      this.$router.push(`/users/${post.uid}/${post.postId}/edit`);
    },
    deletePost(post) {
      this.$router.push(`/users/${post.uid}/${post.postId}/delete`);
    },
    openPost(post) {
      // this.$store.dispatch("posts/getPost", {
      //   postId: post.postId,
      //   uid: post.uid,
      // });
      this.$router.push(`/users/${post.uid}/${post.postId}`);
    },
    postedDay(timestamp) {
      return timestamp.toDate().toLocaleString("ja-JP");
    },
    follow(selectUserData) {
      this.$store.dispatch("follows/follow", {
        following_uid: this.watchUser,
        following_photoURL: this.photoURL,
        following_name: this.name,
        followed_uid: selectUserData.uid,
        followed_photoURL: selectUserData.photoURL,
        followed_name: selectUserData.name,
      });
      this.followStatus = false;
    },
    unFollow(youFollowing) {
      this.$store.dispatch("follows/unFollow", {
        followId: youFollowing.followId,
        follow_status: youFollowing.follow_status,
        following_uid: youFollowing.following_uid,
        followed_uid: youFollowing.followed_uid,
      });
      this.followStatus = true;
    },
  },
};
</script>
<style lang="scss">
.v-text-field_slot {
  margin-top: 5px;
}
.v-input__control {
  padding-top: 6px !important;
}
</style>
