<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col cols="12">
            <v-header>新規投稿</v-header>
          </v-col>
          <!-- <el-card style="flex: 1">
                <div class="clearfix">
                  <el-input placeholder="タイトルを入力" v-model="formData.title" />
                </div>
                <div>
                  <el-input
                    placeholder="本文を入力……"
                    type="textarea"
                    rows="15"
                    v-model="formData.body"
                  />
                </div>
                <div class="text-right" style="margin-top: 16px">
                  <el-button type="primary" @click="publishPost" round>
                    <span class="el-icon-upload2" />
                    <span>Publish</span>ï
                  </el-button>
                </div>
              </el-card> -->
          <v-col cols="12">
            <v-card>
              <v-list two-line>
                <template>
                  <form>
                    <v-text-field
                      v-model="title"
                      label="記事タイトル"
                      required
                      ï
                    />
                    <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">    
                      <m-editor
                        v-model="body"
                        @on-change="handleChange"
                      />
                      <div
                        class="m-editor-preview"
                        v-html="markdownContent"
                      />
                    </div> 
                    <v-btn
                      class="mr-4"
                      @click="publishPost"
                    >
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
  // asyncData({ redirect, store }) {
  //   if (!store.getters["uid"]) {
  //     redirect("/");
  //   }
  data() {
    return {
      title: "",
      body: "",
      // text: '',
      // markdownContent: '',
      // formData: {
      //   title: "",
      //   body: "",
      // },
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
      this.markdownContent = data.htmlContent
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
      this.$router.push("/user/editComplete");
    },
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
