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
                <v-list-item-content>
                  <v-list-item-title>{{ selectPost.name }}</v-list-item-title>

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
      await store.dispatch("posts/getPost", {
        postId: id.postID,
        uid: id.uid,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data() {
    return {};
  },
  computed: {
    selectPost() {
      return this.$store.getters["posts/selectPost"];
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
