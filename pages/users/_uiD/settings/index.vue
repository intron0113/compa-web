<template>
  <v-app>
    <v-main background-colorr:secondary class="py-8 px-6">
      <div class="con">
        <v-row>
          <v-col cols="12" md="8">
            <v-col>
              <div>アイコン</div>
              <v-row class="mb-4">
                <v-col cols="12" sm="10">
                  <v-row
                    justify="space-around"
                    align-content="center"
                    style="height: 100px"
                  >
                    <IconUser
                      :image="selectUserData.photoURL"
                      style="width: 72px; height: 72px"
                    />
                  </v-row>
                </v-col>
                <!-- <FormItemIcon
                  :img="postData.thumbnail"
                  type="file"
                  @change="changeImg"
                /> -->
                <v-col cols="12" sm="2">
                  <v-btn color="primary" @click="imageUpload(selectUserData)">
                    変更
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-card>
              <v-col>
                <div>ユーザー名</div>
                <!-- <v-row class="mb-4">
                  <v-col cols="12" sm="10"> -->
                <v-text-field v-model="selectUserData.name" outlined required />
                <!-- </v-col>
                </v-row> -->

                <div>所属</div>
                <v-select
                  v-model="selectUserData.affiliation"
                  outlined
                  :items="affiliation"
                />
                <div>職種</div>
                <v-select v-model="selectUserData.job" outlined :items="job" />
                <div>居住地</div>
                <v-select
                  v-model="selectUserData.prefectures"
                  outlined
                  :items="prefectures"
                />
                <div>自己紹介</div>
                <v-textarea
                  v-model="selectUserData.profileText"
                  outlined
                  auto-grow
                  counter
                  no-resize
                  rows="3"
                  :rules="myrules"
                />
              </v-col>
              <v-row class="button">
                <v-col cols="12">
                  <v-btn
                    color="primary"
                    depressed
                    elevation="2"
                    x-large
                    @click="updateUserData(selectUserData)"
                  >
                    登録
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="5 py-3">
              <v-row class="button">
                <v-col cols="12">
                  <v-btn
                    color="error"
                    depressed
                    elevation="2"
                    x-large
                    @click="accuntDelete(selectUserData)"
                  >
                    アカウント削除
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <p>※一度アカウントを削除してしまうと二度と元に戻せません。</p>
                  <p>十分ご注意ください。</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "after-login",
  middleware: "private",
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
  data: () => ({
    myrules: [(text) => text.length <= 150 || "最大文字数は150文字です"],
    thumbnail: "",
    postData: {
      thumbnail: "",
    },
    name: "",
    email: "",
    password: "",
    passwordCheck: "",

    post: "投稿記事",
    event: "新規イベント",
    drawer: null,
    show: false,
    affiliation: ["職員", "会社員", "学生", "主婦(夫)", "その他"],
    job: [
      "看護師",
      "薬剤師",
      "医学物理士",
      "臨床検査技師",
      "診療放射線技師",
      "臨床工学技士",
      "理学療法士",
      "作業療法士",
      "言語聴覚士",
      "視能訓練士",
      "義肢装具士",
      "公認心理師",
      "臨床心理士",
      "管理栄養士",
      "栄養士",
      "歯科衛生士",
      "保健師",
      "助産師",
      "衛生検査技師",
      "救急救命士",
      "精神保健福祉士",
      "社会福祉士",
      "介護支援専門員",
      "介護福祉士",
      "保育士",
      "歯科技工士",
      "はり師",
      "きゅう師",
      "あん摩マッサージ指圧師",
      "柔道整復師",
      "診療情報管理士",
      "歯科助手",
      "医療事務",
      "医師事務作業補助者",
      "医療保険事務",
    ],
    prefectures: [
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
    ],
    text: "",
  }),
  computed: {
    selectUserData: {
      get() {
        return Object.assign({}, this.$store.getters["selectUserData"]);
      },
      set(value) {
        this.$store.commit("selectProfile", value);
      },
    },
  },
  methods: {
    updateUserData(selectUserData) {
      const prfofileText = selectUserData.profileText.replace(/\n/g, "\\n");
      console.log(prfofileText);

      this.$store.dispatch("updateUserData", {
        uid: selectUserData.uid,
        name: selectUserData.name,
        photoURL: selectUserData.photoURL,
        affiliation: selectUserData.affiliation,
        job: selectUserData.job,
        prefectures: selectUserData.prefectures,
        profileText: prfofileText,
      });

      this.$router.push(`/users/${selectUserData.uid}/settingComp`);
    },

    imageUpload(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/settings/imageUpload`);
    },
    accuntDelete(selectUserData) {
      this.$router.push(`/users/${selectUserData.uid}/settings/accuntDelete`);
    },
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
    handleKeydown() {
      if (this.composing) return; // IME対応(日本語変換中のEnterを止める)
      const rowCount = `${this.text}\n`.match(/\n/g).length;
      if (rowCount >= 3 === "Enter") {
        // テキストエリアからフォーカスを外すことで、Enterの連打を防ぐ
        document.activeElement.blur();
      }
    },
  },
};
</script>
<style lang="scss">
.button {
  text-align: center;
  margin: 30px 0;
}
.textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #000;
  font-size: 20px;
  line-height: 1.5;
}
</style>
