<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-header>新規投稿</v-header>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-list two-line>
                <template>
                  <form @submit.prevent>
                    <v-text-field
                      v-model="title"
                      label="記事タイトル"
                      required
                      ï
                    />
                    <client-only>
                      <vue-simplemde
                        v-model="body"
                        :configs="configs"
                        @on-change="handleChange"
                      />
                    </client-only>
                    <v-btn class="mr-4" @click="publishPost"> 投稿 </v-btn>
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
  data() {
    return {
      title: "",
      body: "",
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
