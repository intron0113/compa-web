<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1"
      >
        <div>
          <div class="text-center">画像アップロード</div>
        </div>
        <hr class="mb-10" />
        <div class="row" align="center">
          <div class="col-sm-12 sessionsLayoutFormColumn">
            <v-card flat>
              <v-card-text class="pa-0">
                <v-form ref="login_form" v-model="login_valid" lazy-validation>
                  <v-btn>ファイルを選択</v-btn>
                  <div class="mb-10">●●MBまで</div>
                  <v-btn
                    :disabled="!login_valid"
                    color="error"
                    class="my-4 white--text"
                    @click="email_login"
                  >
                    実行
                  </v-btn>
                  <v-btn
                    color="blue darken-3"
                    class="mx-4 white--text"
                    @click="email_login"
                  >
                    キャンセル
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// トップページではヘッダーを表示しないレイアウトを使用
export default {
  // レイアウト plainを指定
  layout: "plain",
};
</script>
