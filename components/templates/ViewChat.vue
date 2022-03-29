<template>
  <div class="view view-chat">
    <div class="top"></div>
    <ListChat :image="image" :name="name" />
    <FormChat />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.view-chat {
  > .top {
    padding: 12px 17px;
    border-bottom: 1px solid #bbbbbb;
    height: 48px;
    background: #fff;

    > .title {
      font-weight: 700;
    }
  }

  > .form-chat {
    margin: 8px 12px;
  }
}
</style>
