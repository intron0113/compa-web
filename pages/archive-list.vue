<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-suheader>{{ post }}</v-suheader>
          </v-col>
          <v-col cols="12">
            <select>
              <option>新しい順</option>
              <option>古い順</option>
            </select>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-list two-line>
                <template>
                  <v-list-item
                    v-for="(post, index) in posts"
                    :key="index"
                    @click="openPost(post, index)"
                  >
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

                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        post.name
                      }}</v-list-item-subtitle>

                      <v-list-item-subtitle>
                        投稿日 {{ postedDay(post.time) }}
                      </v-list-item-subtitle>
                      <v-list-item-title>
                        {{ post.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="post !== 10"
                    :key="`divider-${post}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>

          <v-row>
            <v-col cols="12">
              <v-content>
                <v-pagination
                  v-model="page"
                  :length="length"
                  @input="pageChange"
                ></v-pagination>
              </v-content>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "after-login",
  async asyncData({ store }) {
    await store.dispatch("posts/fetchPosts");
  },
  data: () => ({
    post: "投稿記事",
    drawer: null,
    show: false,
    page: 1,
    length: 0,
    displayLists: [],
    pageSize: 10,
  }),
  computed: {
    posts() {
      return this.$store.getters["posts/posts"];
    },
  },
  mounted() {
    this.length = Math.ceil(this.posts.length / this.pageSize);
    this.displayLists = this.posts.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },
  methods: {
    pageChange(pageNumber) {
      this.displayLists = this.lists.slice(
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
    postedDay(timestamp) {
      return timestamp.toDate().toLocaleString("ja-JP");
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

  > .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
