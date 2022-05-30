<template>
  <!-- <v-container class="width:100%"> -->
  <v-row class="width:100%">
    <v-col>
      <div class="tag-container cf">
        <v-row class="ma-2">
          <v-col>
            <v-chip
              v-for="(tag, index) in tags"
              :key="index"
              class="ma-2"
              color="gray"
              text-color="gray"
              label
              outlined
              close
              @click:close="remove(index)"
            >
              {{ tag.text }}
            </v-chip>
          </v-col>
          <v-col cols="12">
            <!-- <v-text-field
              ref="input"
              v-model="Value"
              counter
              maxlength="15"
              hint="15文字まで"
              filled
              label="タグ入力欄"
              class="input"
              type="text"
              placeholder="ここに入力"
              @oninput="enter($event.target)"
              @keypress="canEnter = true"
            />

            <div class="v-text-field__slot">
              
              <input
                id="input-18"
                autocomplete="off"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                placeholder="Co-mpa内検索"
                type="text"
                value=""
                @keyup.enter="say($event.target)"
                @keypress="setCanMessageSubmit"
              />
              
            </div> -->
            <div
              class="v-input mx-2 mx-md-4 v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed v-text-field--placeholder rounded-lg"
              data-v-7f162986=""
            >
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-input__prepend-inner">
                    <v-icon left> mdi-tag-outline </v-icon>
                  </div>
                  <div class="v-text-field__slot">
                    <input
                      id="input-18"
                      autocomplete="off"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      placeholder="タグ入力"
                      type="text"
                      value=""
                      @keyup.enter="say($event.target)"
                      @keypress="setCanMessageSubmit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
  <!-- </v-container> -->
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
      prevValue: "",
      tags: [],
      canEnter: false,
      // canEnter: true,
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
    setCanMessageSubmit() {
      this.canMessageSubmit = true;
    },
    say(target) {
      if (!this.canMessageSubmit) {
        return;
      }

      // -- submit message -- //
      // this.$store.dispatch("search/getLists", {
      //   searchWord: target.value,
      // });
      // this.$store.commit("search/setQWord", {
      //   searchWord: target.value,
      // });
      // this.$router.push(`/posts/search/${target.value}`);
      // this.$router.push(`/posts/${target.value}`);
      // this.$router.push("/login/serch");
      // this.message = "";
      this.add(target.value.trim().replace(/,/, ""));
      target.value = "";

      this.canMessageSubmit = false;
    },
    propToData() {
      this.tags.length = 0;
      this.prevValue = this.value.split(/,/);
      this.value.split(/,/).forEach((str) => this.add(str));
    },
    enter(target) {
      //日本語の確定で EnterキーのKeyupが発生するのを抑止
      if (!this.canEnter) return;

      // if (typeof target.value === "string" && target.value.trim() != "") {
      //   this.add(target.value.trim().replace(/,/, ""));
      //   target.value = "";
      // }
      this.add(target.value.trim().replace(/,/, ""));
      target.value = "";
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
