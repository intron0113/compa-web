<template>
  <div>
    <ul class="list list-chat">
      <!-- <li
        is="listItemChat"
        v-for="message in messages"
        :key="message.id"
        :messages="message"
        :image="image"
        :name="name"
      ></li> -->
      <!-- <ListItemChat /> -->
    </ul>
    <component :is="ListItemChat"> </component>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    messages() {
      return this.$store.getters["chat/messages"]; //eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
.list-chat {
}
</style>
