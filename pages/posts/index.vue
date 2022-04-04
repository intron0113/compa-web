<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div class="clearfix">
        <span>新着投稿</span>
      </div>
      <el-table
        :data="showPosts"
        style="width: 100%"
        @row-click="handleClick"
        class="table"
      >
        <el-table-column prop="uid" label="投稿者" width="180">
        </el-table-column>
        <el-table-column prop="title" label="タイトル">
          <!-- <template v-slot="scope">
            <span>{{ scope.row.title }}&nbsp;</span>
            <span>
              <i class="el-icon-star-on" />
              <span>{{ scope.row.likes.length }}</span>
            </span>
          </template> -->
        </el-table-column>
        <!-- <el-table-column prop="created_at" label="投稿日時" width="240">
        </el-table-column> -->
      </el-table>
    </el-card>
  </section>
</template>

<script>
// import moment from "~/plugins/moment";
// import { mapGetters } from "vuex";
export default {
  layout: "after-login",
  // async asyncData({ store }) {
  //   await store.dispatch("posts/fetchPosts");
  // },
  computed: {
    showPosts() {
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
      return this.$store.getters["posts / posts"];
    },
    // ...mapGetters("posts", ["posts"]),
  },
  methods: {
    handleClick(post) {
      this.$router.push(`/posts/${post.id}`);
    },
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
