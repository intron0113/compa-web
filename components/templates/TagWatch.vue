<template>
  <!-- <v-app> -->
  <v-container class="width:100%">
    <v-row>
      <v-col>
        <v-chip
          v-for="(tag, index) in tags"
          :key="index"
          class="ma-2"
          color="gray"
          text-color="gray"
          label
          outlined
        >
          <v-icon left> mdi-tag-outline </v-icon>
          {{ tag.text }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-app> -->
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      // type: Array,
      required: true,
    },
  },
  data() {
    return {
      tags: [],
    };
  },

  mounted() {
    this.propToData();
  },

  methods: {
    propToData() {
      this.tags.length = 0;
      this.prevValue = this.value.split(/,/);
      this.value.split(/,/).forEach((str) => this.add(str));
    },
    enter(target) {
      //日本語の確定で EnterキーのKeyupが発生するのを抑止
      if (!this.canEnter) return;

      if (typeof target.value === "string" && target.value.trim() != "") {
        this.add(target.value.trim().replace(/,/, ""));
        target.value = "";
      }
      this.canEnter = false;
    },
    add(str) {
      this.tags.push({ text: str, index: this.tags.length - 1, over: false });
    },
  },
};
</script>
