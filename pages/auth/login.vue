<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1"
      >
        <div>
          <div class="text-center">Co-mpa にログイン</div>
        </div>
        <hr class="mb-10" />
        <div class="row">
          <div class="col-sm-6">
            <SocialLogin />
          </div>
          <div class="page login col-sm-6 sessionsLayoutFormColumn">
            <FormLogin />
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <p class="text-center">
          新規登録の方は<a href="/auth/register">こちらから登録</a>してください
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default { layout: "plain", middleware: "loggedInIsRedirects" };
</script>

<style lang="scss" scoped></style>
