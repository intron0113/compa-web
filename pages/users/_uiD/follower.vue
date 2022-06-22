<template>
  <v-app>
    <v-main background-colorr:secondary class="py-8 px-6">
      <div class="con">
        <v-row>
          <v-col cols="12" sm="5">
            <v-list>
              <v-card>
                <v-list-item>
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
                </v-list-item>
                <v-row class="justify-center">
                  <v-col cols="12">
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle class="text-center wrap-text">
                            {{ selectUserData.name }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>

                <v-card-text class="justify-center">
                  <v-list>
                    <v-row>
                      <v-col cols="4">
                        <v-list-item @click="userPostPage(selectUserData)">
                          <v-list-item-content>
                            <v-list-item-subtitle
                              class="text-caption text-center wrap-text"
                            >
                              <div>投稿</div>
                              {{ userPosts.length }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="4">
                        <v-list-item @click="followPage(selectUserData)">
                          <v-list-item-content>
                            <v-list-item-subtitle
                              class="text-caption text-center wrap-text"
                            >
                              <div>フォロー</div>
                              {{ followLists.length }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="4">
                        <v-list-item @click="followerPage(selectUserData)">
                          <v-list-item-content>
                            <v-list-item-subtitle
                              class="text-caption text-center wrap-text"
                            >
                              <div>フォロワー</div>
                              {{ followerLists.length }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-list>
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
                    v-if="youFollowing.followId == null"
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

                <v-list>
                  <v-row class="ma-1">
                    <v-col col="10">
                      <v-list-item-content>
                        <v-list-item-subtitle class="wrap-text">
                          {{ selectUserData.affiliation }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-subtitle class="wrap-text">
                          {{ selectUserData.job }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-subtitle class="wrap-text">
                          {{ selectUserData.prefectures }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-subtitle class="wrap-text">
                          <div
                            v-html="$md.render(selectUserData.profileText)"
                          />
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list>
              </v-card>
            </v-list>
          </v-col>
          <v-col cols="12" sm="7">
            <v-card class="px-5">
              <v-col cols="12">
                <v-suheader>{{ title }}</v-suheader>
              </v-col>

              <v-list two-line>
                <v-card v-for="follow in fLists" :key="follow.index">
                  <v-row>
                    <v-col class="mx-3" cols="10">
                      <v-list-item @click="openUser(follow, index)">
                        <img
                          v-if="!!follow.photoURL"
                          :src="follow.photoURL"
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
                            {{ follow.name }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="2">
                      <div v-if="watchUser !== follow.following_uid">
                        <v-btn
                          v-if="
                            loginUserFollowLists.includes(
                              follow.following_uid
                            ) == true
                          "
                          color="red"
                          class="mx-3 z-index:100"
                          @click="followerCut(follow, index)"
                        >
                          フォロー解除
                        </v-btn>
                        <v-btn
                          v-else
                          color="green"
                          class="mx-3 z-index:100"
                          @click="addFollow(follow, index)"
                        >
                          フォロー
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-list>
              <v-col v-if="fLists.length == 0" cols="12">
                <v-content>
                  <v-list-item-content>
                    <v-list-item-title class="mb-14">
                      フォローされていません。
                    </v-list-item-title>
                  </v-list-item-content>
                </v-content>
              </v-col>
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
      </div>
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
        route_uid: id.uiD,
      });
      await store.dispatch("posts/userPosts", {
        uid: id.uiD,
      });
      await store.dispatch("userData", {
        uid: id.uiD,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    title: "フォロワー",
    page: 1,
    length: 0,
    fLists: [],
    pageSize: 60,
    followStatus: true,
  }),
  async fetch() {
    this.length = Math.ceil(this.followerLists.length / this.pageSize);
    this.fLists = this.followerLists.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
    this.loginUserFollowLists = this.loginUserLists.map(
      (obj) => obj.followed_uid
    );
  },
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
    followLists() {
      return this.$store.getters["follows/followLists"];
    },
    followerLists() {
      return this.$store.getters["follows/followerLists"];
    },
    loginUserLists() {
      return this.$store.getters["follows/loginUserLists"];
    },
    selectUserData() {
      return this.$store.getters["selectUserData"];
    },
  },
  beforeUpdate() {
    this.length = Math.ceil(this.followerLists.length / this.pageSize);
    this.fLists = this.followerLists.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
    this.loginUserFollowLists = this.loginUserLists.map(
      (obj) => obj.followed_uid
    );
  },
  methods: {
    openSettings(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/settings`);
    },
    userPostPage(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}`);
    },
    followPage(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/follow`);
    },
    followerPage(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/follower`);
    },
    pageChange(pageNumber) {
      this.fLists = this.followerLists.slice(
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
    openUser(follow) {
      this.$router.push(`/users/${follow.following_uid}`);
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
        following_uid: youFollowing.following_uid,
        followed_uid: youFollowing.followed_uid,
      });
      this.followStatus = true;
    },
    addFollow(follow) {
      this.$store.dispatch("follows/follow", {
        following_uid: this.watchUser,
        followed_uid: follow.following_uid,
      });
      this.followStatus = false;
    },

    followerCut(follow) {
      this.$store.dispatch("follows/followerCut", {
        // followId: follow.followId,
        following_uid: this.watchUser,
        followed_uid: follow.following_uid,
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
