<template>
  <v-container>
    <v-row justify="center">
      <v-col
        class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1"
      >
        <div>
          <div class="plain-title">
            好きな画像をアイコンに設定してください。
          </div>
        </div>
        <hr class="mb-10" />
        <div class="row" align="center">
          <div class="col-sm-12 sessionsLayoutFormColumn">
            <v-card flat>
              <v-card-text class="pa-0">
                <v-form ref="login_form" v-model="login_valid" lazy-validation>
                  <FormItemIcon
                    :img="postData.thumbnail"
                    type="file"
                    @change="changeImg"
                  />

                  <v-btn
                    :disabled="!login_valid"
                    color="blue darken-3"
                    class="my-4 white--text"
                    @click="imageUpload(selectUserData)"
                  >
                    実行
                  </v-btn>
                  <v-btn
                    color="error"
                    class="mx-4 white--text"
                    @click="cancel(selectUserData)"
                  >
                    キャンセル
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "plain",
  middleware: "auth",
  async asyncData({ store, route, error }) {
    const id = route.params;
    console.log(id);
    try {
      await store.dispatch("userData", {
        uid: id.uiD,
      });
    } catch (e) {
      error({ statusCode: 404 });
    }
  },
  data() {
    return {
      thumbnail: "",
      postData: {
        thumbnail: "",
      },
    };
  },
  computed: {
    selectUserData() {
      return this.$store.getters["selectUserData"];
    },
  },
  methods: {
    changeImg(e) {
      this.thumbnail = e.target.files[0];
      if (this.thumbnail) {
        const reader = new FileReader();
        reader.readAsDataURL(this.thumbnail);
        reader.onload = () => {
          this.postData.thumbnail = reader.result + "";
        };
      }
    },
    imageUpload(selectUserData) {
      this.$store.dispatch("imageUpload", {
        uid: selectUserData.uid,
        thumbnail: this.thumbnail,
      });
      this.$router.push(`/users/${selectUserData.uid}/settingComp`);
    },
    cancel(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/settings`);
    },
  },
};
</script>
