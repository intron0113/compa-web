<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1"
      >
        <div>
          <div class="text-center">プロフィール登録</div>
        </div>
        <hr class="mb-10" />
        <div class="row" align="center">
          <div class="col-sm-12 sessionsLayoutFormColumn">
            <div>登録完了しました</div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="button">
      <v-col cols="12">
        <v-btn to="/" color="primary" depressed elevation="2" large>
          登録
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// トップページではヘッダーを表示しないレイアウトを使用
export default {
  // レイアウト plainを指定
  layout: "plain",
  middleware: "auth",
};
</script>
<style>
.button {
  text-align: center;
  margin: 30px 0;
}
</style>
