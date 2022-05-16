<template>
  <v-app>
    <v-container class="width:100%">
      <v-row>
        <v-col>
          <div class="tag-container cf">
            <v-row class="ma-3">
              <v-col
                v-for="(tag, index) in tags"
                :key="index"
                cols="2"
                class="tag-label"
                :class="{ dragover: tag.over }"
                draggable="true"
                @dragstart="dragstart(tag, $event)"
                @dragend="dragend"
                @dragenter.prevent="dragenter(tag)"
                @dragleave="dragleave(tag)"
                @dragover.prevent="dragover(tag)"
                @drop="drop(tag, $event)"
              >
                <span class="tag-label-text">{{ tag.text }}</span>
                <a
                  href="#"
                  class="tag-remove"
                  @click.stop.prevent="remove(index)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 50 50"
                    version="1.1"
                    width="15px"
                    height="15px"
                  >
                    <g id="surface1">
                      <path
                        style=""
                        d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z "
                      />
                    </g>
                  </svg>
                </a>
              </v-col>
              <v-col cols="12">
                <div class="editor">
                  <input
                    ref="input"
                    class="input"
                    type="text"
                    placeholder="ここに入力"
                    @keyup.enter="enter($event.target)"
                    @keypress="canEnter = true"
                  />
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tags: [],
      prevValue: "",
      canEnter: false,
      draggingItem: null,
    };
  },
  watch: {
    value: function (newVal, oldVal) {
      if (this.tags.join(",") != newVal) {
        this.propToData();
      }
    },
  },
  mounted() {
    this.propToData();
  },
  updated() {
    let newVal = this.tags.map((tag) => tag.text).join(",");
    if (!this.prevValue || this.prevValue != newVal) {
      this.$emit("input", newVal);
      this.prevValue = newVal;
    }
  },
  methods: {
    propToData() {
      this.tags.length = 0;
      // this.prevValue = this.value.split(/,/);
      // this.value.split(/,/).forEach((str) => this.add(str));
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
    remove(index) {
      this.tags.splice(index, 1);
    },
    add(str) {
      this.tags.push({ text: str, index: this.tags.length - 1, over: false });
      //array.splice(1, 0, 'A');
    },
    sort() {
      this.tags.sort((a, b) => {
        return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
      });
    },
    dragstart(item, e) {
      this.draggingItem = item;
      e.target.style.opacity = 0.5;
    },
    dragend(e) {
      e.target.style.opacity = 1;
      this.tags.forEach((n) => {
        n.over = false;
      });
    },
    dragenter(item) {
      item.over = true;
    },
    dragover(item) {
      item.over = true;
    },
    dragleave(item) {
      item.over = false;
    },
    drop(item, e) {
      const index = item.index;
      this.tags.forEach((n) => {
        if (n.index >= index) n.index++;
      });
      this.draggingItem.index = index;
      this.sort();
      this.draggingItem = null;
    },
  },
};
</script>
<style scoped>
.tag-container {
  padding: 5px 5px 0 5px;
  border: 1px solid #ccc;
  margin: 0px;
  margin-left: -5px;
  font-size: 15px;
}
.tag-container .tag-label,
.tag-container .editor {
  float: left;
}
.tag-container .tag-label {
  background: #ebf4fb;
  padding: 0 2.1em 0 12px;
  margin: 0 5px 5px 0;
  height: 2em;
  border-radius: 1em;
  box-sizing: border-box;
  position: relative;
}
.tag-label-text {
  display: inline-block;
  height: 100%;
  margin: 0;
  padding: 0.5em 0 0 0;
  line-height: 1;
}
.tag-container a.tag-remove {
  height: 100%;
  width: 2em;
  display: block;
  position: absolute;
  border-radius: 2em;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
}
.tag-container a.tag-remove:hover {
  background: #bbd8f1;
}
.tag-container .tag-label svg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.tag-container .editor .input {
  border: 0px;
  outline: 0;
  background: transparent;
  padding: 3px 4px;
  min-width: 5em;
  width: auto;
}
.cf::after {
  content: "";
  clear: both;
  display: table;
}

.tag-container .tag-label.dragover {
  margin-left: 10px;
}
.tag-container .tag-label.dragover::before {
  width: 4px;
  height: 1.6em;
  background: #333;
  display: block;
  content: "";
  position: absolute;
  left: -10px;
  top: 0.2em;
  background: rgb(109, 109, 112);
  border-radius: 1em;
}
</style>
