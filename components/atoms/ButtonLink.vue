<template>
  <v-btn
    large
    v-bind="$attrs"
    class="button button-link primary"
    @click="$emit('click')"
  >
    <!-- <span class="label"> -->
    {{ label }}
    <!-- </span> -->
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "label",
    },
  },
};
</script>

<style lang="scss" scoped>
.button-link {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 37px;
  border: none;
  border-radius: 4px;
  appearance: none;
  background-color: $blue;
  // background-color: #000080;
  color: #ffffff;

  > .label {
    line-height: 150%;
  }
}
</style>
