<template>
  <div justify="center">
    <form class="form form-register-profile" @submit.prevent>
      <FormItemIcon :img="postData.thumbnail" type="file" @change="changeImg" />
      <div class="row content">
        <div class="sns col-sm-3 col-xs-6">
          <IconBrand item-status="google" @click="loginGoogle" />
          <IconBrand item-status="twitter" @click="loginTwitter" />
          <SocialRegister />
        </div>
        <div class="form col-sm-6 col-xs-12">
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
              class="col-lg-6 col-sm-12"
              v-model="password"
              required
              placeholder="パスワード"
              type="password"
            />
            <FormItemInput
              class="col-lg-6 col-sm-12"
              v-model="passwordCheck"
              required
              placeholder="パスワード（確認）"
              type="password"
            />

            <p class="placeholder">
              半角英字、数字、記号を組み合わせて 8 文字以上で入力してください
            </p>
          </div>
        </div>
      </div>
      <div class="button">
        <!-- <nuxt-link to="/auth/login" class="link">ログイン</nuxt-link> -->
        <FormItemButton type="submit" label="次へ" @click="register" />
      </div>
    </form>
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
    changeImg(e) {
      this.thumbnail = e.target.files[0];
      if (this.thumbnail) {
        const reader = new FileReader();
        reader.readAsDataURL(this.thumbnail);
        reader.onload = () => {
          this.postData.thumbnail = reader.result + "";
        };
      }
    },
    register() {
      if (this.password === this.passwordCheck) {
        this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          thumbnail: this.thumbnail,
        });
      }
    },
    loginGoogle() {
      this.$store.dispatch("loginGoogle");
    },
    loginTwitter() {
      this.$store.dispatch("loginTwitter");
    },
    loginFacebook() {
      this.$store.dispatch("loginFacebook");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-register-profile {
  > .form-item-icon {
    margin: auto;
    width: 120px;
    height: 120px;
  }

  > .content {
    display: flex;
    margin-top: 24px;

    > .sns {
      display: flex;
      justify-content: space-between;
      width: 240px;
      margin-right: 40px;

      > .icon {
        border: 1px solid $blue;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        > .icon-brand-google {
          width: 32px;
          height: 32px;
        }
      }
    }

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
