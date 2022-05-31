<template>
  <v-app>
    <v-main background-colorr:secondary class="py-8 px-6">
      <div class="con">
        <v-row justify="center">
          <v-col cols="8" sm="12">
            <h2>{{ post }}</h2>
          </v-col>
          <!-- <v-col cols="12">
            <select>
              <option>新しい順</option>
              <option>古い順</option>
            </select>
          </v-col> -->
          <v-col cols="12">
            <v-card class="px-5">
              <!-- <v-col clos="12">
                <v-subheader>投稿記事</v-subheader>
              </v-col> -->

              <v-list two-line>
                <v-card v-for="post in displayLists" :key="post.uid">
                  <v-list-item @click="openUser(post, index)">
                    <img
                      v-if="!!post.photoURL"
                      :src="post.photoURL"
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
                        {{ post.name }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        {{ postedDay(post.time) }}に投稿
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list>
                    <v-list-item three-line @click="openPost(post, index)">
                      <v-list-item-content>
                        <!-- <v-list-item-subtitle class="text-h5 mb-1">
                          {{ post.title }}
                        </v-list-item-subtitle> -->
                        <v-list-item-subtitle class="text-h5 mb-1 wrap-text">
                          {{ post.title }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-if="post.tags !== ''">
                          <TagWatch v-model="post.tags" />
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-list>
              <v-col v-if="displayLists.length == 0" cols="12">
                <v-content>
                  <v-list-item-content>
                    <v-list-item-title class="mb-14">
                      投稿記事はまだありません。
                    </v-list-item-title>
                  </v-list-item-content>
                </v-content>
              </v-col>
              <v-col v-if="displayLists.length !== 0" cols="12">
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
      this.displayLists = this.posts.slice(
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
    openUser(post) {
      // this.$store.dispatch("posts/getPost", {
      //   postId: post.postId,
      //   uid: post.uid,
      // });
      this.$router.push(`/users/${post.uid}`);
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
  margin-right: 10px;

  > .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
