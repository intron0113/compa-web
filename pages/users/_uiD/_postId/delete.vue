<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div>
          <div class="plain-title text-center">記事を削除する</div>
        </div>
        <hr class="mb-10" />
        <div class="row">
          <div class="col-sm-12 text-center">
            <p class="plain-main">記事を削除しますか？</p>
          </div>
          <div class="col-sm-12 text-center">
            <p class="plain-sub">一度削除したデータは復旧できません</p>
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <FormItemButton
          block
          label="削除"
          type="button"
          @click="deletePost(selectPost)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "plain",
  middleware: "private",
  async asyncData({ store, route, error }) {
    const id = route.params;
    console.log(id);
    try {
      await store.dispatch("posts/getPost", {
        postId: id.postId,
        uid: id.uid,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  computed: {
    selectPost() {
      return this.$store.getters["posts/selectPost"];
    },
  },
  methods: {
    deletePost(selectPost) {
      this.$store.dispatch("posts/deletePost", {
        postId: selectPost.postId,
        photoURL: this.photoURL,
        name: this.name,
      });
      this.$store.dispatch("comments/deletePostComments", {
        postId: selectPost.postId,
      });
      this.$router.push("/users/deleteComplete");
    },
  },
};
</script>

<style lang="scss" scoped></style>
