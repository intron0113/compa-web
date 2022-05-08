<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-header>新規投稿</v-header>
          </v-col>

          <div class="wrap" />
          <v-col cols="12">
            <v-card>
              <v-list two-line>
                <template>
                  <form @submit.prevent>
                    <v-text-field
                      v-model="selectPost.title"
                      label="記事タイトル"
                      required
                      ï
                    />
                    <client-only>
                      <vue-simplemde
                        v-model="selectPost.body"
                        :configs="configs"
                        @on-change="handleChange"
                      />
                    </client-only>
                    <!-- <div
                      class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
                    >
                      <m-editor
                        v-model="selectPost.body"
                        @on-change="handleChange"
                      />
                      <div class="m-editor-preview" v-html="markdownContent" />
                    </div> -->
                    <v-btn class="mr-4" @click="updatePost(selectPost)">
                      投稿
                    </v-btn>
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
          "heading-smaller",
          "heading-bigger",
          "|",
          "code",
          "quote",
          "link",
          "|",
          "unordered-list",
          "ordered-list",
          "table",
          "horizontal-rule",
          "|",
          "side-by-side",
          "fullscreen",
          "|",
          "guide",
        ],
      },
    };
  },
  // mounted() {
  //   return this.$store.getters["posts/selectPost"].then(
  //     (response) => (this.formData = response.data)
  //   );
  // },
  computed: {
    selectPost: {
      get() {
        return Object.assign({}, this.$store.getters["posts/selectPost"]);
      },
      set(value) {
        this.$store.dispatch("posts/fetchPost", value);
      },
    },

    // selectPost() {
    //   return this.$store.getters[
    //     ("posts/selectPost",
    //     {
    //       formData: {
    //         title: "selectPost.title",
    //         body: "selectPost.body",
    //       },
    //     })
    //   ];
    // },
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
    updatePost(selectPost) {
      this.$store.dispatch("posts/updatePost", {
        postId: selectPost.postId,
        photoURL: this.photoURL,
        name: this.name,
        uid: this.uid,
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
</style>
