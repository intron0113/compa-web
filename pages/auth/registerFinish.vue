<template>
  <div class="page register-finish">
    <div class="form">
      <p class="title">登録完了</p>
      <hr class="mb-10" />
      <div class="text">
        <p class="main">登録完了しました。</p>
        <p class="sub">始めていきましょう。</p>
      </div>
      <FormItemButton
        label="始める"
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
        text-align: right;
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
