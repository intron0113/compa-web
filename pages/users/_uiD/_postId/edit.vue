<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div class="clearfix">
        <el-input
          v-model="formData.title"
          placeholder="タイトルを入力"
        />
      </div>
      <div>
        <el-input
          v-model="formData.body"
          placeholder="本文を入力……"
          type="textarea"
          rows="15"
        />
        {{ formData }}
        <!-- {{ formDatta.title }} -->
      </div>
      <div
        class="text-right"
        style="margin-top: 16px"
      >
        <el-button
          type="primary"
          round
          @click="publishPost"
        >
          <span class="el-icon-upload2" />
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
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
      //   formData: {
      //     title: "",
      //     body: "",
      //   },
      formData: [],
    };
  },
  // mounted() {
  //   return this.$store.getters["posts/selectPost"].then(
  //     (response) => (this.formData = response.data)
  //   );
  // },
  computed: {
    formDatas() {
      return this.$store.getters["posts/selectPost"];
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
        title: this.formData.title,
        body: this.formData.body,
      });
      this.title = "";
      this.body = "";
    },
  },
};
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>
