<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="8" sm="12">
            <h2>記事編集</h2>
          </v-col>

          <!-- <div class="wrap" /> -->
          <v-col cols="10" sm="12">
            <v-card>
              <v-list two-line>
                <template>
                  <form @submit.prevent>
                    <v-row class="pa-2" justify="center">
                      <v-col cols="12">
                        <v-row justify="center">
                          <v-col cols="8" sm="12">
                            <v-text-field
                              v-model="selectPost.title"
                              outlined
                              label="記事タイトル"
                              required
                            />
                            <TagInput v-model="selectPost.tags" />
                          </v-col>
                          <v-col cols="10" sm="12">
                            <div class="post-texttitle">記事本文</div>
                            <client-only>
                              <vue-simplemde
                                v-model="selectPost.body"
                                :configs="configs"
                                @on-change="handleChange"
                              />
                            </client-only>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <FormItemButton
                          block
                          label="投稿"
                          type="button"
                          @click="updatePost(selectPost)"
                        />
                      </v-col>
                    </v-row>
                  </form>
                </template>
              </v-list>
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
  data() {
    return {
      markdownContent: "",
      configs: {
        autosave: {
          enabled: false,
        },
        initialValue: "",
        toolbar: [
          "preview",
          "|",
          "bold",
          "italic",
          "heading",
          // "heading-smaller",
          // "heading-bigger",
          "|",
          "code",
          "quote",
          "link",
          "|",
          "unordered-list",
          "ordered-list",
          "table",
          // "horizontal-rule",
          // "|",
          // "side-by-side",
          // "fullscreen",
          "|",
          "guide",
        ],
      },
    };
  },

  computed: {
    selectPost: {
      get() {
        return Object.assign({}, this.$store.getters["posts/selectPost"]);
      },
      set(value) {
        this.$store.dispatch("posts/fetchPost", value);
      },
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
    handleChange(data) {
      this.markdownContent = data.htmlContent;
    },

    updatePost(selectPost) {
      this.$store.dispatch("posts/updatePost", {
        postId: selectPost.postId,
        photoURL: this.photoURL,
        name: this.name,
        uid: this.uid,
        tags: selectPost.tags,
        title: selectPost.title,
        body: selectPost.body,
      });

      this.$router.push(`/users/editComplete`);
    },
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
.post-texttitle {
  font-size: 16px;
  margin: 0 0 6px 6px;
}
</style>
