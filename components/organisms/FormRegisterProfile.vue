<template>
  <div class="row">
    <div class="sns col-sm-6">
      <SocialRegister />
    </div>
    <div class="form col-sm-6 col-xs-12">
      <toaster />
      <form class="form form-register-profile" @submit.prevent>
        <div class="v-row input">
          <FormItemInput
            v-model="name"
            class="col-sm-12"
            placeholder="ユーザー名"
            type="text"
          />
          <FormItemInput
            v-model="email"
            class="col-sm-12"
            required
            placeholder="メールアドレス"
            type="email"
          />

          <FormItemInput
            v-model="password"
            class="col-sm-12"
            required
            placeholder="パスワード"
            type="password"
          />
          <FormItemInput
            v-model="passwordCheck"
            class="col-sm-12"
            required
            placeholder="パスワード（確認）"
            type="password"
          />

          <p class="placeholder">
            半角英字、数字、記号を組み合わせて 8 文字以上で入力してください
          </p>
        </div>
        <div class="button">
          <FormItemButton type="submit" label="登録" @click="register" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thumbnail: "",
      postData: {
        thumbnail: "",
      },
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    register() {
      if (this.password === this.passwordCheck) {
        this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-register-profile {
  > .content {
    > .form {
      width: calc(100% - 280px);

      > .form-item-input:nth-child(2) {
        margin-top: 8px;
      }

      > .input {
        > .input {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;

          > .form-item-input {
            width: calc(50% - 4px);
          }
        }

        > .placeholder {
          font-size: 12px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
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
