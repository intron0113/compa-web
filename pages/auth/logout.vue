<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1"
      >
        <div>
          <div class="text-center">Compa からログアウト</div>
        </div>
        <hr class="mb-10" />
        <div class="row">
          <div class="text-center col-sm-12">ログアウトしますか？</div>
          <div class="text-center page login col-sm-12">
            <div class="button">
              <FormItemButton
                type="submit"
                label="ログアウト"
                @click="logout"
              />
            </div>
          </div>
        </div>
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
