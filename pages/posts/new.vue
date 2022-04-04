<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
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
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  // asyncData({ redirect, store }) {
  //   if (!store.getters["uid"]) {
  //     redirect("/");
  //   }
  data() {
    return {
      formData: {
        title: "",
        body: "",
      },
    };
  },
  computed: {
    uid() {
      return this.$store.getters.user.uid;
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
