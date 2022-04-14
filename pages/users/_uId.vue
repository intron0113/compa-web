<template>
  <v-app>
    <v-main background-colorr:secondary>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col cols="12">
            <v-subheader>{{ post }}</v-subheader>
            <v-card>
              <v-list two-line>
                <template>
                  <v-list-item>
                    <v-list-item-avatar color="grey darken-1" />

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  />
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-row class="button">
            <v-col cols="12">
              <v-btn
                to="/login/archive-list"
                color="primary"
                depressed
                elevation="2"
                x-large
              >
                投稿記事一覧へ
              </v-btn>
            </v-col>
          </v-row>

          <!-- 編集用 -->

          <v-col cols="12">
            <v-subheader>{{ event }}</v-subheader>
            <v-card
              v-for="n in 6"
              :key="n"
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
                    <v-list-item :key="n">
                      <v-list-item-avatar color="grey darken-1" />

                      <v-list-item-content>
                        <v-list-item-title>Message </v-list-item-title>

                        <v-list-item-subtitle>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Nihil repellendus distinctio similique
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider
                      v-if="n !== 6"
                      :key="`divider-${n}`"
                      inset
                    />
                  </template>
                </v-list>
                <v-card-title> Top western road trips </v-card-title>

                <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="orange lighten-2"
                    text
                  >
                    Explore
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    icon
                    @click="show = !show"
                  >
                    <v-icon>
                      {{
                        show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                      }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider />

                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more
                      than he could deliver. You won't have time for sleeping,
                      soldier, not with all the bed making you'll be doing. Then
                      we'll go with that data file! Hey, you add a one and two
                      zeros to that or we walk! You're going to do his laundry?
                      I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-list>
            </v-card>
            <v-row class="button">
              <v-col cols="12">
                <v-btn
                  to="/login/events-list"
                  color="primary"
                  depressed
                  elevation="2"
                  x-large
                >
                  イベント一覧へ
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'after-login',
  data: () => ({
    post: '投稿記事',
    event: '新規イベント',
    drawer: null,
    show: false,
  }),
}
</script>
<style lang="scss">
.button {
  text-align: center;
  margin: 30px 0;
}
</style>
