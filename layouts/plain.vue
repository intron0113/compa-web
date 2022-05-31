<template>
  <v-app light>
    <div
      class="box3 primary"
      style="cursor: pointer"
      @click="$router.push('/posts')"
    >
      <p>Co-mpa</p>
    </div>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<style>
.box3 {
  padding: 0.5em 1em;
  margin: 2em;

  width: 130px;
}
.box3 p {
  margin: 0;
  padding: 0;
  color: white;
  font-size: 25px;
}
</style>
