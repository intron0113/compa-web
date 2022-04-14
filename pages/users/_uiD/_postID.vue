<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="4" md="2">
            <v-card elevation="5 py-3">
              <v-card-actions class="justify-center px-6 py-3">
                <v-btn
                  block
                  color="accent"
                  depressed
                  elevation="2"
                  @click="editPost(post, index)"
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
                  @click="deletePost(post, index)"
                >
                  削除
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="10">
            <v-card class="mx-auto" outlined>
              <v-list-item>
                <div class="icon icon-user">
                  <img
                    v-if="!!photoURL"
                    :src="photoURL"
                    alt="プロフィール画像"
                    class="image"
                  />
                  <img
                    v-else
                    src="/atoms/icons/user.jpg"
                    alt="プロフィール画像"
                    class="image"
                  />
                </div>

                <v-list-item-content>
                  <v-list-item-title>{{ name }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <!-- {{ postedDay(time) }}に投稿 -->
                    {{ time }}に投稿
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card class="mt-4">
              <v-card-text>
                <!-- {{ post.body }}
                <div
                  class="m-editor-preview"
                  v-html="displayTitle(post.body)"
                /> -->
                <div class="m-editor-preview" v-html="$md.render(markdown)" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <!-- </div> -->
</template>
<script>
export default {
  layout: "after-login",

  async asyncData({ store, route, error }) {
    const id = route.params;
    console.log(id);
    try {
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
      // body: this.$store.getters["posts/selectPost.body"],
      // name: this.$store.getters["posts/selectPost.name"],
      photoURL: this.$store.getters["posts/selectPost.photoURL"],
      postId: this.$store.getters["posts/selectPost.postId"],
      time: this.$store.getters["posts/selectPost.tims"],
      title: this.$store.getters["posts/selectPost.title"],
      uid: this.$store.getters["posts/selectPost.uid"],
      markdown: "# Hello World!",
    };
  },
  computed: {
    body() {
      // return thisthis.$store.getters["posts/selectPost.body"];
      this.$store.getters["posts/selectPost.body"];
      return console.log(body);
    },
    name() {
      return this.$store.getters["posts/selectPost.name"];
    },
    selectPost() {
      return this.$store.getters["posts/selectPost"];
    },
  },

  methods: {
    editPost(post) {
      this.$router.push(`/users/${post.uid}/${post.postId}/edit`);
    },
    deletePost(post) {
      this.$router.push(`/users/${post.uid}/${post.postId}/delete`);
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

    displayTitle: function (text) {
      return text.split(/\n/);
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
