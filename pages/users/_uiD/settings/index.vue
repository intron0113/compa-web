<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="2" sm="1">
            <v-btn icon large class="mr-1" v-on="on">
              <v-avatar size="38px" item>
                <v-icon dark x-large> mdi-account-circle </v-icon>
              </v-avatar>
            </v-btn>
          </v-col>
          <v-col cols="9" sm="11">
            <h2>@ユーザー名/アカウント名</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-col>
              <div>アイコン</div>
              <v-row class="mb-4">
                <v-col cols="12" sm="10">
                  <v-btn icon large class="mr-1" v-on="on">
                    <v-avatar size="38px" item>
                      <v-icon dark x-large> mdi-account-circle </v-icon>
                    </v-avatar>

                    <FormItemIcon
                      :img="postData.thumbnail"
                      type="file"
                      @change="changeImg"
                    />
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-btn color="primary"> 変更 </v-btn>
                </v-col>
              </v-row>
              <div>ユーザー名変更</div>
              <v-row class="mb-4">
                <v-col cols="12" sm="10">
                  <v-text-field label="ユーザー名" required />
                </v-col>
                <v-col cols="12" sm="2">
                  <v-btn color="primary"> 変更 </v-btn>
                </v-col>
              </v-row>
              <div>パスワード変更</div>
              <v-row class="mb-4">
                <v-col cols="12" sm="10">
                  <v-text-field label="パスワード変更" required />
                </v-col>
                <v-col cols="12" sm="2">
                  <v-btn color="primary"> 変更 </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="5 py-3">
              <v-card-actions class="justify-center px-6 py-3">
                <v-btn to="/" block color="accent" depressed elevation="2">
                  公開用
                </v-btn>
              </v-card-actions>
              <v-card-actions class="justify-center px-6 py-3">
                <v-btn to="/" block color="accent" depressed elevation="2">
                  個人用
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-row class="button">
            <v-col cols="12">
              <v-btn to="/" color="error" depressed elevation="2" x-large>
                アカウント削除
              </v-btn>
            </v-col>
            <v-col cols="12">
              <p>※一度アカウントを削除してしまうと二度と元に戻せません。</p>
              <p>十分ご注意ください。</p>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "after-login",
  data: () => ({
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
    getTextareaHeight() {
      // テキストエリアの高さ制限
      let rowCount = `${this.text}\n`.match(/\n/g).length;
      if (rowCount > 3) rowCount = 3;
      const LINEHEIGHT = 20 * 1.5; // １行あたりの高さ(font-size:20pxとline-height: 1.4を考慮)
      const PADDING_TOP_AND_BOTTOM = 5 * 2; // padding上下の5pxを考慮
      const BORDER_TOP_AND_BOTTOM = 1 * 2; // border上下の1pxを考慮
      return (
        LINEHEIGHT * rowCount + PADDING_TOP_AND_BOTTOM + BORDER_TOP_AND_BOTTOM
      );
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
