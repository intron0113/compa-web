<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div>
          <div class="plain-title text-center">Compa からログアウト</div>
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
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
