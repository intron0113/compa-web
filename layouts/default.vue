<template>
  <v-app light>
    <v-app-bar
      color="primary"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      clipped-right
      app
    >
      <div class="con">
        <v-row>
          <v-col cols="6" sm="8" md="10">
            <v-toolbar-title
              style="width: 100%"
              class="ml-0 pl-4"
              @click="$router.push('/')"
            >
              <span class="white--text" style="cursor: pointer">{{
                title
              }}</span>
              <v-spacer />
            </v-toolbar-title>
          </v-col>

          <!-- 新規登録ボタン -->
          <v-col cols="3" sm="2" md="1">
            <v-btn
              to="auth/register"
              x-small
              color="secondary"
              depressed
              elevation="2"
              outlined
            >
              新規登録
            </v-btn>
          </v-col>
          <!-- ログインアイコン -->
          <v-col cols="3" sm="2" md="1">
            <v-btn to="auth/login" x-small text color="secondary">
              ログイン
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer color="primary">
      <v-row justify="space-between">
        <v-col cols="12" sm="7">
          <!-- <div class="white--text" style="text-align: center"> -->
          <div class="white--text">
            &copy; {{ new Date().getFullYear() }} {{ author }}
          </div>
        </v-col>
        <v-col cols="12" sm="5">
          <v-list dense color="primary">
            <v-list-item
              v-for="(item, index) in footerMenuItems"
              :key="index"
              @click="footerMenuItemClick(item.href)"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="white--text">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: false,
      drawer: null,
      title: "Co-mpa",
      footerMenuItems: [
        { icon: "", text: "利用規約", href: "userPolicy" },
        { icon: "", text: "プライバシーポリシー", href: "privacyPolicy" },
      ],
      author: "Co-mpa",
      justify: "space-between",
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    avatarMenuItemClick(href) {
      switch (href) {
        case "/logout":
          window.alert("TODO implement logout");
          break;
        default:
          this.$router.push(href);
          break;
      }
    },
    footerMenuItemClick(href) {
      switch (href) {
        default:
          this.$router.push(href);
          break;
      }
    },
    changeSerach() {
      this.search = !this.search;
    },
    setCanMessageSubmit() {
      this.canMessageSubmit = true;
    },
    say() {
      if (!this.canMessageSubmit) {
        return;
      }

      // -- submit message -- //

      this.$router.push("/serch");
      this.message = "";
      this.canMessageSubmit = false;
    },
  },
};
</script>
<style>
.serachMobile {
  position: fixed;
  z-index: 10;
  width: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
