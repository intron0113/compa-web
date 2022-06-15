<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div>
          <div class="plain-title text-center">アカウントを削除する</div>
        </div>
        <hr class="mb-10" />
        <div class="row">
          <div class="col-sm-12 text-center">
            <p class="plain-main">アカウントを本当に削除しますか？</p>
          </div>
          <div class="col-sm-12 text-center">
            <p class="plain-sub">一度削除したデータは永久に復旧できません</p>
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <v-btn color="error" depressed elevation="2" x-large @click="allDelete">
          アカウント削除
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "plain",
  middleware: "private",

  computed: {
    uid() {
      return this.$store.getters.user.uid;
    },
  },
  methods: {
    allDelete() {
      this.$store.dispatch("posts/allDeletePost", {
        uid: this.uid,
      });
      this.$store.dispatch("comments/allDeleteComments", {
        uid: this.uid,
      });
      this.$store.dispatch("follows/allDeleteFollows", {
        uid: this.uid,
      });
      this.$store.dispatch("deleteImage", {
        uid: this.uid,
      });
      this.$store.dispatch("deleteUserData", {
        uid: this.uid,
      });
      this.$store.dispatch("deleteAccount", {
        uid: this.uid,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
