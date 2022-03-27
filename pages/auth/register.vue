<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="
          col-lg-8
          col-lg-offset-2
          col-md-8
          col-md-offset-2
          col-sm-10
          col-sm-offset-1
        "
      >
        <div>
          <div class="text-center">Co-mpaへようこそ！</div>
          <div class="text-center">新規登録して利用を開始しましょう。</div>
        </div>
        <hr class="mb-10" />

        <FormRegisterProfile />
      </v-col>
      <v-col cols="12">
        <p class="text-center">
          アカウントお持ちの方は<a href="/auth/login">こちらからログイン</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "plain",
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  > .form {
    width: 680px;

    > .title {
      font-size: 24px;
      line-height: 150%;
      text-align: center;
    }

    > .form-register-profile {
      margin-top: 40px;
    }
  }
}
</style>
