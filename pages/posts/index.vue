<template>
  <section class="container posts-page">
    <table>
      <thead>
        <tr>
          <th colspan="2">投稿者</th>
          <th>投稿日時</th>
          <th>タイトル</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(post, index) in posts"
          :key="index"
          @click="openPost(post, index)"
        >
          <td>
            <div class="icon icon-user">
              <img
                v-if="!!post.photoURL"
                :src="post.photoURL"
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
          </td>
          <td>{{ post.name }}</td>
          <td>{{ postedDay(post.time) }}</td>
          <td>{{ post.title }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  layout: "after-login",
  async asyncData({ store }) {
    await store.dispatch("posts/fetchPosts");
  },

  computed: {
    posts() {
      return this.$store.getters["posts/posts"];
    },
  },
  methods: {
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
    postedDay(timestamp) {
      return timestamp.toDate().toLocaleString("ja-JP");
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
