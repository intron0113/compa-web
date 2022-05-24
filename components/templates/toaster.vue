<template>
  <!-- timeout、color追加 -->
  <v-snackbar
    v-model="setSnackbar"
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    <!-- 追加 -->
    {{ toast.msg }}
    <!-- トースター 削除 -->
    <template #action="{ attrs }">
      <v-btn v-bind="attrs" text :color="toast.color" @click="resetToast">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  // 削除
  // data () {
  //   return {
  //     snackbar: true
  //   }
  // },
  // 以下、追加
  computed: {
    toast() {
      return this.$store.state.toast;
    },
    setSnackbar: {
      get() {
        return !!this.toast.msg;
      },
      set(val) {
        this.resetToast();
        return val;
      },
    },
  },
  methods: {
    resetToast() {
      return this.$store.dispatch("getToast", { msg: null });
    },
  },
};
</script>
