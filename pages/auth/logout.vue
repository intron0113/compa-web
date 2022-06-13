<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div>
          <div class="plain-title text-center">Co-mpa からログアウト</div>
        </div>
        <hr class="mb-10" />
        <div class="row">
          <div class="col-sm-12 text-center">
            <p class="plain-main">ログアウトしますか？</p>
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <FormItemButton
          block
          label="ログアウト"
          type="button"
          @click="logout"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "plain",
  middleware: "auth",
  computed: {
    uid() {
      return this.$store.getters.user.uid;
    },
    email() {
      return this.$store.getters.user.email;
    },
  },
  methods: {
    logout() {
      if (this.email !== null) {
        console.log(this.email);
        this.$store.dispatch("logout");
      } else {
        console.log("ゲストログイン");
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
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
