<template>
  <v-app dark>
    <v-app-bar
      color="primary"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      clipped-right
      app
    >
      <v-container>
        <v-row>
          <v-col cols="8" sm="3" md="2">
            <v-toolbar-title
              style="width: 100%"
              class="ml-0 pl-4"
              @click="$router.push('/posts')"
            >
              <span class="white--text">{{ title }}</span>
              <v-spacer />
            </v-toolbar-title>
          </v-col>
          <v-col cols="6" md="7" class="d-none d-sm-block">
            <div
              class="
                v-input
                mx-2 mx-md-4
                v-input--hide-details v-input--dense
                theme--light
                v-text-field
                v-text-field--single-line
                v-text-field--solo
                v-text-field--is-booted
                v-text-field--enclosed
                v-text-field--placeholder
                rounded-lg
              "
              style="max-width: 450px"
              data-v-7f162986=""
            >
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-input__prepend-inner">
                    <span
                      aria-hidden="true"
                      class="v-icon notranslate ml-1 mr-2 theme--light"
                      data-v-7f162986=""
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-hidden="true"
                        class="v-icon__svg"
                      >
                        <path
                          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                        ></path></svg
                    ></span>
                  </div>
                  <div class="v-text-field__slot">
                    <input
                      autocomplete="off"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      id="input-18"
                      placeholder="compa内検索"
                      type="text"
                      value=""
                      @keyup.enter="say"
                      @keypress="setCanMessageSubmit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <!-- PC用記事投稿ボタン -->
          <v-col cols="2" class="d-none d-sm-block">
            <v-btn depressed color="blue" to="posts/new"> 投稿する </v-btn>
          </v-col>

          <!-- モバイル用検索アイコン -->
          <v-col cols="2" class="d-block d-sm-none">
            <v-btn icon large class="mr-1" @click="changeSerach">
              <span
                aria-hidden="true"
                class="v-icon notranslate ml-1 mr-2 theme--light white--text"
                data-v-7f162986=""
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  class="v-icon__svg"
                >
                  <path
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  ></path></svg
              ></span>
            </v-btn>
          </v-col>
          <!-- ログインアイコン -->
          <v-col cols="2" sm="1">
            <v-menu
              offset-y
              transition="scroll-y-transition"
              :close-on-click="true"
              :close-on-content-click="true"
            >
              <template v-slot:activator="{ on }">
                <v-btn icon large class="mr-1" v-on="on">
                  <!-- <v-avatar size="38px" item>
                    <v-icon dark x-large>mdi-account-circle</v-icon>
                  </v-avatar> -->
                  <IconUser :image="image" />
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item
                  v-for="(item, index) in avatarMenuItems"
                  :key="index"
                  @click="avatarMenuItemClick(item.href)"
                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>

      <!-- </v-col>
        </v-row> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <!-- モバイル検索 -->
        <div
          class="
            serachMobile
            v-input
            mx-2 mx-md-4
            v-input--hide-details v-input--dense
            theme--light
            v-text-field
            v-text-field--single-line
            v-text-field--solo
            v-text-field--is-booted
            v-text-field--enclosed
            v-text-field--placeholder
            rounded-lg
            d-block d-sm-none
          "
          style="max-width: 90%"
          data-v-7f162986=""
        >
          <div
            v-show="search"
            class="v-input__control display: flex flex-direction"
          >
            <div class="v-input__slot">
              <div class="v-input__prepend-inner">
                <span
                  aria-hidden="true"
                  class="v-icon notranslate ml-1 mr-2 theme--light"
                  data-v-7f162986=""
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                    class="v-icon__svg"
                  >
                    <path
                      d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                    ></path></svg
                ></span>
              </div>
              <div class="v-text-field__slot">
                <input
                  autocomplete="off"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="input-18"
                  placeholder="検索"
                  type="text"
                  value=""
                  @keyup.enter="say"
                  @keypress="setCanMessageSubmit"
                />
              </div>
            </div>
          </div>
        </div>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="primary">
      <v-row :justify="justify">
        <v-col>
          <span class="white--text"
            >&copy; {{ new Date().getFullYear() }} {{ author }}</span
          >
        </v-col>
        <!-- <v-col>
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
        </v-col> -->
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      image: this.$store.getters.user.photoURL,
      search: false,
      drawer: null,
      title: "Compa",
      avatarMenuItems: [
        { icon: "", text: "マイページ", href: "login/my-page-top" },
        { icon: "", text: "新規投稿", href: "posts/new" },
        { icon: "", text: "新規イベント", href: "login/events" },
        { icon: "mdi-logout", text: "ログアウト", href: "login/logout" },
      ],
      footerMenuItems: [
        { icon: "", text: "利用規約", href: "/login/terms-of-service" },
        {
          icon: "",
          text: "プライバシーポリシー",
          href: "/login/privacy-policy",
        },
      ],
      author: "Compa",
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

      this.$router.push("/login/serch");
      this.message = "";
      this.canMessageSubmit = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.serachMobile {
  position: fixed;
  z-index: 10;
  width: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-header {
  padding: 0 20px 0 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bbbbbb;
  width: 100%;

  > .title {
    font-family: "Pacifico", cursive;
    font-size: 22px;
    line-height: 120%;
  }
}
</style>
