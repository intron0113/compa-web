<template>
  <v-app>
    <v-card>
      <v-col cols="12">
        <!-- <v-card-actions class="justify-center">
                    <v-btn icon large class="mr-1" v-on="on">
                      <v-avatar size="38px" item>
                        <v-icon dark x-large>mdi-account-circle</v-icon>
                      </v-avatar>
                    </v-btn>
                  </v-card-actions> -->
        <v-row
          justify="space-around"
          align-content="center"
          style="height: 100%"
        >
          <!-- <v-avatar width="10vh" height="auto">
            <img alt="PROFILE" style="object-fit: cover" />
          </v-avatar> -->
          <IconUser :image="image" />
        </v-row>
      </v-col>
      <v-card-text class="justify-center">
        <v-row>
          <v-col col="4">
            <a href="/intron0113" class="css-1it6av2">0<br />投稿</a>
          </v-col>
          <v-col col="4">
            <a href="/intron0113/following_users" class="css-1it6av2"
              >3<br />フォロー</a
            >
          </v-col>
          <v-col col="4">
            <a href="/intron0113/followers" class="css-1it6av2"
              >1<br />フォロワー</a
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn> プロフィール編集 </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      image: this.$store.getters.user.photoURL,
    };
  },

  methods: {
    aPageChange(pageNumber) {
      this.archiveLists = this.aLists.slice(
        this.aPageSize * (pageNumber - 1),
        this.aPageSize * pageNumber
      );
    },
    ePageChange(pageNumber) {
      this.eventLists = this.eLists.slice(
        this.ePageSize * (pageNumber - 1),
        this.ePageSize * pageNumber
      );
    },
  },
};
</script>
<style lang="scss">
.v-text-field_slot {
  margin-top: 5px;
}
.v-input__control {
  padding-top: 6px !important;
}
</style>
