<template>
  <v-btn
    block
    large
    :disabled="disabled || processing"
    class="button button-link primary"
    @click="handleClick"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "SingleSubmitButton",
  props: {
    label: {
      type: String,
      default: "label",
    },
    // A function which returns Promise.
    onclick: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      processing: false,
    };
  },
  methods: {
    handleClick(event) {
      if (this.processing) return;
      this.processing = true;
      this.onclick(event).then(() => {
        this.processing = false;
      });
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
  color: #ffffff;

  > .label {
    line-height: 150%;
  }
}
</style>
