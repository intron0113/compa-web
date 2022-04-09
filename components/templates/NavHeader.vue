<template>
  <div>
    <IconUser :image="image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: this.$store.getters.user.photoURL,
    };
  },
};
</script>

<style lang="scss" scoped></style>
