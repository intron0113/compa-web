<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12" sm="4">
            <v-col cols="12">
              <Mypage-box />
            </v-col>
          </v-col>
          <v-col cols="12" sm="8">
            <v-col cols="12">
              <v-card class="px-5">
                <v-col cols="12">
                  <v-suheader>{{ post }}</v-suheader>
                </v-col>

                <v-list two-line>
                  <v-card
                    v-for="post in postLists"
                    :key="post.index"
                    @click="openPost(post, index)"
                  >
                    <!-- <v-list-item> -->
                    <v-row>
                      <v-col class="mx-3" cols="12" lg="8">
                        <v-list-item-avatar color="grey darken-1" />

                        <v-list-item-content>
                          <v-list-item-subtitle>
                            投稿日 {{ postedDay(post.time) }}
                          </v-list-item-subtitle>
                          <v-list-item-title>
                            {{ post.title }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                      <v-col class="mb-4" cols="12" lg="4">
                        <v-btn class="mx-3"> 編集 </v-btn>
                        <v-btn> 削除 </v-btn>
                      </v-col>
                    </v-row>
                    <!-- </v-list-item> -->
                  </v-card>
                </v-list>

                <v-col cols="12">
                  <v-content>
                    <v-pagination
                      v-model="page"
                      :length="length"
                      class="pagination-more-width:400px"
                      @input="PageChange"
                    />
                  </v-content>
                </v-col>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "after-login",
  async asyncData({ store, route, error }) {
    const id = route.params;
    console.log(id);
    try {
      await store.dispatch("posts/userPosts", id);
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    tab: "archive",
    post: "投稿した記事",
    event: "参加イベント",
    drawer: null,
    show: false,
    page: 1,

    length: 0,

    postLists: [],

    pageSize: 5,
    imgSrc: "",
  }),
  computed: {
    userPosts() {
      return this.$store.getters["posts/setUserPosts"];
    },
  },
  mounted() {
    this.length = Math.ceil(this.userPosts.length / this.pageSize);
    this.postLists = this.userPosts.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
    console.log(this.postLists);
  },
  methods: {
    pageChange(pageNumber) {
      this.postLists = this.userPosts.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },

    postedDay(timestamp) {
      return timestamp.toDate().toLocaleString("ja-JP");
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
</style>
