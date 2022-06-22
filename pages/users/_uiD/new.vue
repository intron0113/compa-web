<template>
  <v-app>
    <v-main background-colorr:secondary class="py-8 px-6">
      <div class="con">
        <v-row justify="center">
          <v-col cols="12">
            <h2>新規投稿</h2>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-list two-line>
                <template>
                  <v-row class="pa-2" justify="center">
                    <v-col cols="12" md="12">
                      <v-row justify="center">
                        <v-col cols="8" sm="12">
                          <v-text-field
                            v-model="title"
                            outlined
                            label="記事タイトル"
                            required
                            ï
                          />
                        </v-col>
                        <v-col cols="10" sm="12">
                          <div class="post-texttitle">記事本文</div>
                          <client-only class="width:100%">
                            <vue-simplemde
                              v-model="body"
                              :configs="configs"
                              @on-change="handleChange"
                            />
                          </client-only>
                        </v-col>
                        <v-col cols="8" sm="12">
                          <TagInput v-model="tag_str" />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <SubmitButton
                        label="投稿"
                        :onclick="pushPost"
                        type="submit"
                      />
                    </v-col>
                  </v-row>
                </template>
              </v-list>
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
  async asyncData({ store, route, error }) {
    const id = route.params;
    try {
      await store.dispatch("userData", {
        uid: id.uiD,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data() {
    return {
      title: "",
      body: "",
      tag_str: "新規投稿",
      markdownContent: "",

      configs: {
        autosave: {
          enabled: false,
        },
        initialValue: "",
        toolbar: [
          "preview",
          // "|",
          "bold",
          "italic",
          "heading",
          // "heading-smaller",
          // "heading-bigger",
          // "|",
          "code",
          "quote",
          "link",
          // "|",
          // "unordered-list",
          // "ordered-list",
          "table",
          // "horizontal-rule",
          // "|",
          // "side-by-side",
          // "fullscreen",
          // "|",
          "guide",
        ],
      },
    };
  },
  computed: {
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
    publishPost() {
      this.$store.dispatch("posts/publishPost", {
        photoURL: this.photoURL,
        name: this.name,
        uid: this.uid,
        tags: this.tag_str,
        title: this.title,
        body: this.body,
      });
      this.title = "";
      this.body = "";
      this.$router.push("/users/editComplete");
    },
    pushPost(event) {
      event.preventDefault();
      return new Promise((resolve) => {
        this.$store.dispatch("posts/publishPost", {
          photoURL: this.photoURL,
          name: this.name,
          uid: this.uid,
          tags: this.tag_str,
          title: this.title,
          body: this.body,
        });
        this.title = "";
        this.body = "";
        this.$router.push("/users/editComplete");
        resolve();
      });
    },
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
