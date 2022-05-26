<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row justify="center">
          <v-col cols="8" sm="12">
            <h2>新規投稿</h2>
          </v-col>

          <v-col cols="10" sm="12">
            <v-card>
              <v-list two-line>
                <template>
                  <form @submit.prevent>
                    <v-row class="pa-2" justify="center">
                      <v-col cols="12" md="12">
                        <v-row justify="center">
                          <!-- <v-col> -->
                          <v-col cols="8" sm="12">
                            <v-text-field
                              v-model="title"
                              outlined
                              label="記事タイトル"
                              required
                              ï
                            />
                            <TagInput v-model="tag_str" />
                          </v-col>
                          <v-col cols="10" sm="12">
                            <div class="post-texttitle">記事本文</div>
                            <client-only>
                              <vue-simplemde
                                v-model="body"
                                :configs="configs"
                                @on-change="handleChange"
                              />
                            </client-only>
                          </v-col>
                          <!-- </v-col> -->
                        </v-row>
                      </v-col>
                      <v-col cols="3">
                        <FormItemButton
                          block
                          label="投稿"
                          type="button"
                          @click="publishPost"
                        />
                      </v-col>
                    </v-row>
                    <!-- <v-btn class="mr-4" @click="publishPost"> 投稿 </v-btn> -->
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
  middleware: "auth",
  // asyncData({ redirect, store }) {
  //   if (!store.getters["uid"]) {
  //     redirect("/");
  //   }
  async asyncData({ store, route, error }) {
    const id = route.params;
    console.log(id);
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
      // text: '',
      markdownContent: "",
      // formData: {
      //   title: "",
      //   body: "",
      // },
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
    // async publish() {
    //   const payload = {
    //     user: this.uid,
    //     ...this.formData,
    //   };
    //   await this.publishPost({ payload });
    //   this.$router.push("/posts");
    // },
    // ...mapActions("users", ["updateUser"]),
    // ...mapActions("posts", ["publishPost"]),
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
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
