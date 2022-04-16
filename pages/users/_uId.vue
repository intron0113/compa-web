<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12" sm="4">
            <v-col cols="12">
              <Mypage-box />
            </v-col>
          </v-col>
          <v-col cols="12" sm="8">
            <v-col cols="12">
              <v-card class="px-5">
                <v-col cols="12">
                  <v-suheader>{{ post }}</v-suheader>
                </v-col>

                <v-list two-line>
                  <v-card v-for="list in archiveLists" :key="list.index">
                    <!-- <v-list-item> -->
                    <v-row>
                      <v-col class="mx-3" cols="12" lg="8">
                        <v-list-item-avatar color="grey darken-1" />

                        <v-list-item-content>
                          <v-list-item-title>
                            Message {{ list.id }}
                          </v-list-item-title>

                          <v-list-item-subtitle>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Nihil repellendus distinctio similique
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-col>
                      <v-col class="mb-4" cols="12" lg="4">
                        <v-btn class="mx-3"> 編集 </v-btn>
                        <v-btn> 削除 </v-btn>
                      </v-col>
                    </v-row>
                    <!-- </v-list-item> -->
                  </v-card>
                </v-list>

                <v-col cols="12">
                  <v-content>
                    <v-pagination
                      v-model="aPage"
                      :length="aLength"
                      class="pagination-more-width:400px"
                      @input="aPageChange"
                    />
                  </v-content>
                </v-col>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card class="px-5">
                <v-col cols="12">
                  <v-subheader>{{ event }}</v-subheader>
                </v-col>
                <v-card
                  v-for="list in eventLists"
                  :key="list.index"
                  class="mx-auto"
                  max-width="100%"
                  two-line
                >
                  <v-list>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="200px"
                    />

                    <v-list two-line>
                      <template>
                        <v-list-item :key="list">
                          <v-list-item-avatar color="grey darken-1" />

                          <v-list-item-content>
                            <v-list-item-title>
                              Message {{ list.id }}
                            </v-list-item-title>

                            <v-list-item-subtitle>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Nihil repellendus distinctio
                              similique
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider
                          v-if="list !== 10"
                          :key="`divider-${list}`"
                          inset
                        />
                      </template>
                    </v-list>
                    <v-card-title> Top western road trips </v-card-title>

                    <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                    <v-card-actions>
                      <v-btn color="orange lighten-2" text> Explore </v-btn>

                      <v-spacer />

                      <v-btn icon @click="show = !show">
                        <v-icon>
                          {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
                        </v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <div v-show="show">
                        <v-divider />

                        <v-card-text>
                          I'm a thing. But, like most politicians, he promised
                          more than he could deliver. You won't have time for
                          sleeping, soldier, not with all the bed making you'll
                          be doing. Then we'll go with that data file! Hey, you
                          add a one and two zeros to that or we walk! You're
                          going to do his laundry? I've got to find a way to
                          escape.
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-list>
                </v-card>
                <v-col cols="12">
                  <v-content>
                    <v-pagination
                      v-model="page"
                      :length="eLength"
                      @input="ePageChange"
                    />
                  </v-content>
                </v-col>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "after-login",
  data: () => ({
    tab: "archive",
    post: "投稿した記事",
    event: "参加イベント",
    drawer: null,
    show: false,
    aPage: 1,
    ePage: 1,
    aLength: 0,
    eLength: 0,
    aLists: [],
    eLists: [],
    archiveLists: [],
    eventLists: [],
    aPageSize: 5,
    ePageSize: 1,
    imgSrc: "",
  }),
  mounted() {
    this.aLists = new Array(10).fill().map((v, i) => {
      return { id: i, title: "Title" + i };
    });
    this.aLength = Math.ceil(this.aLists.length / this.aPageSize);
    this.archiveLists = this.aLists.slice(
      this.aPageSize * (this.aPage - 1),
      this.aPageSize * this.aPage
    );
    this.eLists = new Array(10).fill().map((v, i) => {
      return { id: i, title: "Title" + i };
    });
    this.eLength = Math.ceil(this.eLists.length / this.ePageSize);
    this.eventLists = this.eLists.slice(
      this.ePageSize * (this.ePage - 1),
      this.ePageSize * this.ePage
    );
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
