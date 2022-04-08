<template>
  <section class="container posts-page">
    <table>
      <thead>
        <tr>
          <th>投稿者</th>
          <th>投稿日時</th>
          <th>タイトル</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.uid">
          <td>{{ post.uid }}</td>
          <td>{{ postedDay(post.time) }}</td>
          <td>{{ post.title }}</td>
        </tr>
      </tbody>
    </table>

    <!-- <v-data-table
      :headers="headers"
      :items="posts"
      :items-per-page="5"
      class="elevation-1"
    >
    </v-data-table> -->
  </section>
</template>

<script>
// import moment from "~/plugins/moment";
// import { mapGetters } from "vuex";
export default {
  layout: "after-login",
  async asyncData({ store }) {
    await store.dispatch("posts/fetchPosts");
  },
  data() {
    return {
      headers: [
        {
          text: "投稿者",
          align: "start",
          sortable: false,
          value: "uid",
        },
        { text: "投稿日時", value: "time" },
        { text: "タイトル", value: "title" },
      ],
    };
  },
  computed: {
    posts() {
      // return this.posts.map((post) => {
      //   post.created_at = moment(post.created_at).format("YYYY/MM/DD HH:mm:ss");
      //   return post;
      // });
      // return [
      //   {
      //     id: "001",
      //     title: "How to devlopment Nuxt.js Application",
      //     body: "Lorem ipusm dolor sit amet,consectutr adipiscing elit...",
      //     created_at: "2021/03/20 12:00:00",
      //     user: {
      //       id: "potato4d",
      //     },
      //   },
      //   {
      //     id: "002",
      //     title: "How to devlopment Nuxt.js Application",
      //     body: "Lorem ipusm dolor sit amet,consectutr adipiscing elit...",
      //     created_at: "2021/03/20 12:00:00",
      //     user: {
      //       id: "potato4d",
      //     },
      //   },
      // ];
      return this.$store.getters["posts/posts"];
      // ...mapGetters("posts", ["posts"]),
    },
  },
  methods: {
    handleClick(post) {
      this.$router.push(`/posts/${post.id}`);
    },
    postedDay(timestamp) {
      return timestamp.toDate().toLocaleString("ja-JP");
    },
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
