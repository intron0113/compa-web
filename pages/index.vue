<template>
  <div>
    <section>
      <TopImage />
      <div class="discription">
        <h2>Whtat's Co-mpa?</h2>
        <p class="discription__comment">
          Co-mpaはco-medical posting aplication の略になります。
          <br />
          当サイトは日々自己研鑽されている医療従事者の方にむけて<br />
          アウトプットの場を提供する事を目的に開発しました。<br />
          自己研鑽の一端に有効活用してください。<br />
        </p>
      </div>
      <div class="features">
        <h2>Co-mpaでできること</h2>
        <div class="features__list">
          <div class="contents">
            <p class="contents__title">アウトプット機能</p>
            <div class="contents__discription">
              <p>マークダウン形式で記事を書き投稿できます。</p>
            </div>
          </div>
          <div class="contents">
            <p class="contents__title">検索機能</p>
            <div class="contents__discription">
              <p>他のユーザーの記事を検索し閲覧できます。</p>
            </div>
          </div>
          <div class="contents">
            <p class="contents__title">編集機能</p>
            <div class="contents__discription">
              <p>記事編集で文字の付け足しや、削除ができます。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<scripti>
// import Kodawari from '../components/organisms/Kodawari.vue';
export default {
  middleware: "loggedInIsRedirects",
};
</scripti>

<style lang="scss" scoped>
.discription {
  width: 100%;
  height: 250px;
  color: #232323;
  font-size: 1rem;
  line-height: 35px;
  letter-spacing: 0.1rem;
  text-align: center;
  padding: 20px;
}
.discription__comment {
  font-size: 1rem;
}
.features {
  width: 100%;
  height: 360px;
  // margin: 50px 0 0 0;
  padding: 48px 0 0 0;
  text-align: center;
  background-color: #f0e8df;
}
.features__list {
  display: flex;
  margin-top: 50px;
}
.contents {
  width: 30%;
  margin: 0 30px;
}
.contents__title {
  border: solid 3px orange;
  padding: 0.5em;
  border-radius: 0.5em;
}
@media (max-width: 576px) {
  .features {
    width: 100%;
    height: 550px;
  }
  .features__list {
    flex-direction: column;
    width: 100%;
  }
  .contents {
    width: 80%;
    margin: 0 auto;
  }
  .contents__discription {
    font-size: 0.8rem;
    margin-bottom: 30px;
  }
  .discription__comment {
    font-size: 0.8rem;
    padding: 10px;
    line-height: 20px;
  }
}
/* @media (min-width: px) {
  .home {
  background: url("~@/assets/mv.png");
  background-blend-mode: lighten;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 55vh;
  }
} */
.v-toolbar__content {
  justify-content: space-between;
}
</style>
