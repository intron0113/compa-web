<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div>
          <div class="plain-title text-center">記事投稿</div>
        </div>
        <hr class="mb-10" />
        <div class="row">
          <div class="col-sm-12 text-center">
            <p class="plain-main">投稿完了しました</p>
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <FormItemButton
          block
          label="戻る"
          type="button"
          @click="$router.push('/posts')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "plain",
  middleware: "auth",
  methods: {
    deletePost() {
      this.$router.push("/users/deleteComplete");
    },
  },
};
</script>

<style lang="scss" scoped>
.register-finish {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  > .form {
    width: 400px;

    > .title {
      font-size: 24px;
      line-height: 150%;
      text-align: center;
    }

    > .text {
      margin: 40px 0;

      > .main {
        text-align: center;
        font-size: 14px;
        line-height: 150%;
        font-weight: 700;
      }

      > .sub {
        text-align: center;
        font-size: 12px;
        line-height: 150%;
        margin-top: 8px;
      }
    }

    > .button-link {
      margin-left: auto;
    }
  }
}
</style>
