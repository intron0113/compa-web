<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="end">
          <v-col cols="4" md="2">
            <v-card v-if="watchUser == selectPost.uid" elevation="5 py-3">
              <v-card-actions class="justify-center px-6 py-3">
                <v-btn
                  block
                  color="accent"
                  depressed
                  elevation="2"
                  @click="editPost(selectPost)"
                >
                  編集
                </v-btn>
              </v-card-actions>
              <v-card-actions class="justify-center px-6 py-3">
                <v-btn
                  block
                  color="accent"
                  depressed
                  elevation="2"
                  @click="deletePost(selectPost)"
                >
                  削除
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="10">
            <v-card class="mx-auto" outlined>
              <v-list-item>
                <IconUser :image="selectPost.photoURL" />
                <v-list-item-content @click="userPage(selectPost)">
                  <v-list-item-title>
                    {{ selectPost.name }}
                  </v-list-item-title>

                  <v-list-item-subtitle>
                    {{ postedDay(selectPost.time) }}に投稿
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ selectPost.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="selectPost.tags !== ''">
                    <TagWatch v-model="selectPost.tags" />
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card class="mt-4">
              <v-card-text>
                <!-- <div
                  class="m-editor-preview"
                  v-html="$md.render(selectPost.body)"
                /> -->
                <div v-html="$md.render(selectPost.body)" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="10">
            <v-card class="pb-10">
              <v-card-subtitle class> コメント欄 </v-card-subtitle>

              <v-col cols="12">
                <v-list two-line>
                  <v-card v-for="comment in commentLists" :key="comment.index">
                    <v-row>
                      <v-col @click="openPost(comment, index)">
                        <!-- <v-card @click="openPost(post, index)"> -->
                        <v-row>
                          <v-col class="mx-3" cols="12" lg="8">
                            <img
                              v-if="!!comment.photoURL"
                              :src="comment.photoURL"
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
                              <v-list-item-subtitle>
                                {{ comment.name }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                投稿日 {{ postedDay(comment.time) }}
                              </v-list-item-subtitle>

                              <v-list-item-title
                                style="white-space: pre-wrap"
                                v-text="comment.commentBody"
                              />
                            </v-list-item-content>
                          </v-col>
                        </v-row>
                        <!-- </v-list-item> -->
                        <!-- <v-list-item> -->
                        <!-- </v-card> -->
                      </v-col>
                      <v-col class="mb-4" cols="12" lg="4">
                        <v-btn class="mx-3" @click="deleteComment(comment)">
                          削除
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-list>
              </v-col>

              <v-card-actions class="justify-center">
                <v-btn color="accent" @click="toComment"> コメントする </v-btn>
              </v-card-actions>
              <!-- コメント投稿機能 -->
              <v-col cols="12">
                <v-card v-show="comment">
                  <v-row>
                    <v-col cols="12" class="pa-6">
                      <h2>コメント内容</h2>
                      <v-form ref="form" lazy-validation>
                        <v-textarea
                          v-model="commentBody"
                          outlined
                          auto-grow
                          counter
                          no-resize
                          rows="6"
                          :rules="myrules"
                        />
                        <v-btn
                          block
                          large
                          color="accent"
                          class="mt-4 font-weight-bold"
                          @click="publishComment(selectPost)"
                        >
                          送信
                        </v-btn>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>
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
    console.log(id);
    try {
      await store.dispatch("comments/commentLists", id);
      await store.dispatch("posts/getPost", {
        postId: id.postID,
        uid: id.uid,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data() {
    return {
      comment: false,
      commentBody: "",
      myrules: [(text) => text.length <= 500 || "最大文字数は500文字です"],
    };
  },
  computed: {
    watchUser() {
      return this.$store.getters.user.uid;
    },
    commentLists() {
      return this.$store.getters["comments/userComments"];
    },
    selectPost() {
      return this.$store.getters["posts/selectPost"];
    },
    uid() {
      return this.$store.getters.user.uid;
    },
    name() {
      return this.$store.getters.user.name;
    },
    photoURL() {
      return this.$store.getters.user.photoURL;
    },
  },

  methods: {
    editPost(selectPost) {
      this.$router.push(`/users/${selectPost.uid}/${selectPost.postId}/edit`);
    },
    deletePost(selectPost) {
      this.$router.push(`/users/${selectPost.uid}/${selectPost.postId}/delete`);
    },
    postedDay(timestamp) {
      return timestamp.toDate().toLocaleString("ja-JP");
    },

    pageChange(pageNumber) {
      this.displayLists = this.lists.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    toComment() {
      this.comment = !this.comment;
    },
    publishComment(selectPost) {
      const commentB = this.commentBody.replace(/\n/g, "\\n");
      this.$store.dispatch("comments/publishComment", {
        photoURL: this.photoURL,
        name: this.name,
        uid: this.uid,
        postId: selectPost.postId,
        commentBody: commentB,
      });

      this.commentBody = "";
      this.$router.push("/users/editComplete");
    },

    deleteComment(comment) {
      this.$store.dispatch("comments/deleteComment", {
        commentId: comment.commentId,
        postId: comment.postId,
        photoURL: this.photoURL,
        name: this.name,
        // uid: this.uid,
        // title: selectPost.title,
        // body: selectPost.body,
      });
      this.$router.push("/users/deleteComplete");
    },
    displayTitle: function (text) {
      return text.split(/\n/);
    },
    userPage(selectPost) {
      this.$router.push(`/users/${selectPost.uid}`);
    },
  },
};
</script>
<style lang="scss" scoped>
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

  > .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
