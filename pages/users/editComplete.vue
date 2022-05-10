<template>
  <div class="page register-finish">
    <div class="form">
      <p class="title">記事投稿</p>
      <hr class="mb-10" />
      <div class="text">
        <p class="main">投稿完了しました</p>
      </div>
      <FormItemButton
        label="戻る"
        type="button"
        @click="$router.push('/posts')"
      />
    </div>
  </div>
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
