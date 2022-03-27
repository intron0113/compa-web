<template>
  <form class="form form-login" @submit.prevent>
    <div class="row input">
      <FormItemInput
        class="col-sm-12"
        v-model="email"
        type="text"
        placeholder="メールアドレス"
      />
      <FormItemInput
        v-model="password"
        type="password"
        placeholder="パスワード"
        class="col-sm-12"
      />
      <div class="button">
        <FormItemButton type="submit" label="ログイン" @click="login" />
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
