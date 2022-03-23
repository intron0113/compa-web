<template>
  <section class="kodawari">
    <div class="kodawari-back"></div>
    <div class="container">
      <div class="kosawari-text">
        <h2>創業昭和３３年の老舗「梅干庵」</h2>
        <p>厳選された素材を最新設備の工場で製品化。</p>
        <p>美味しくて安心感のある梅干はこうして生まれました。</p>
        <div class="btn-1"><span>新規登録</span></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      ActiveBtn: false,
    };
  },
  computed: {
    Tips() {
      return this.$store.state.Tips;
    },
  },
  methods: {
    Commit() {
      this.$router.push("commit");
    },
  },
};
</script>
<style>
/* 梅やこだわり */

.kodawari {
  width: 100%;
  height: 400p;
  background: url("~assets/image-1.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10rem 0rem 20rem 0rem;
  color: #fff;
  position: relative;
  /* margin-top: 50px; */
}

.kodawari-back {
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.kosawari-text {
  position: absolute;
  top: 50px;
  right: 50px;
}

.btn-1 {
  color: white;
  font-size: 16px;
  font-weight: bold;
  background: transparent;
  width: 150px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 2px solid white;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: 0.3s;
  margin-top: 50px;
  border-radius: 0.25rem;
}
.btn-1::before,
.btn-1::after {
  content: "";
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  transition: transform ease 0.3s;
}
.btn-1::before {
  right: 0px;
  border-right: 60px solid transparent;
  border-bottom: 60px solid white;
  transform: translateX(-100%);
}
.btn-1::after {
  left: 0px;
  border-left: 60px solid transparent;
  border-top: 60px solid white;
  transform: translateX(100%);
}
.btn-1:hover {
  color: black;
  cursor: pointer;
}
.btn-1:hover::before {
  transform: translateX(-9%);
}
.btn-1:hover::after {
  transform: translateX(9%);
}
</style>
