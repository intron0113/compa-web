<template>
  <div class="page register-finish">
    <div class="form">
      <p class="title">記事を削除する</p>
      <hr class="mb-10" />
      <div class="text">
        <p class="main">記事を削除しますか？</p>
        <p class="sub">一度削除したデータは復旧できません</p>
      </div>
      <FormItemButton label="削除" type="button" @click="deletePost" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "plain",
  methods: {
    deletePost() {
      this.$router.push("/users/deleteComplete");
    },
  },
};
</script>

<style lang="scss" scoped>
.register-finish {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  > .form {
    width: 400px;

    > .title {
      font-size: 24px;
      line-height: 150%;
      text-align: center;
    }

    > .text {
      margin: 40px 0;

      > .main {
        text-align: center;
        font-size: 14px;
        line-height: 150%;
        font-weight: 700;
      }

      > .sub {
        text-align: center;
        font-size: 12px;
        line-height: 150%;
        margin-top: 8px;
      }
    }

    > .button-link {
      margin-left: auto;
    }
  }
}
</style>
