<template>
  <form class="form form-login" light @submit.prevent>
    <div class="row input">
      <toaster />
      <FormItemInput
        v-model="email"
        class="col-sm-12"
        required
        type="text"
        placeholder="メールアドレス"
      />
      <FormItemInput
        v-model="password"
        type="password"
        required
        placeholder="パスワード"
        class="col-sm-12 mb-16"
      />
      <div class="button">
        <FormItemButton
          type="submit"
          color="navy"
          label="ログイン"
          @click="login"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(email, password) {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-login {
  > .form-item-input:nth-child(2) {
    margin-top: 8px;
  }

  > .button {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .link {
      color: $blue;
    }
  }
}
</style>
