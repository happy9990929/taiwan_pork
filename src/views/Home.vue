<script>
import Navigation from "@/components/Navigation.vue";
import Restaurant from "@/components/Restaurant.vue";
export default {
  components: {
    Navigation,
    Restaurant,
  },
};
</script>

<template>
  <div class="banner">
    <div class="title_box">
      <img src="@/assets/images/taiwanpork_logo.png" class="title_logo" />
      <h1 class="title">臺灣豬證明標章商家資料查詢</h1>
      <h2 class="title_en">TAIWAN PORK</h2>
    </div>
    <div class="pig_box">
      <img src="@/assets/images/pig.png" class="pig" />
    </div>
    <div class="arrow">
      <i class="fas fa-angle-down"></i>
    </div>
  </div>
  <div>
    <Navigation />
    <Restaurant />
  </div>
  <div class="meat"></div>
</template>

<style lang="scss" scoped>
.banner {
  background-image: url("~@/assets/images/bg1.jpg");
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
}
.pig_box {
  position: absolute;
  bottom: 10vh;
  width: 100%;
}
.pig {
  height: 50vh;
}
.title_box {
  padding-top: 5vh;
}
.title_logo {
  height: 12vh;
}
.title {
  font-size: 6vw;
  font-weight: normal;
  margin: 0;
  @media screen and (min-width: 768px) {
    font-size: 42px;
    margin-top: 15px;
  }
}
.title_en {
  font-size: 4vw;
  font-weight: normal;
  margin: 0;
  @media screen and (min-width: 768px) {
    font-size: 28px;
  }
}
.arrow {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 4vh;
  color: #fff;
}
.meat {
  background-attachment: fixed;
  background-image: url("~@/assets/images/meat.jpg");
  background-size: 150%;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 200px;
  width: 100%;
  @media screen and (min-width: 768px) {
    background-size: 100%;
    background-position: center 200%;
    height: 300px;
  }
  @media screen and (min-width: 1200px) {
    background-position: top center;
    height: 400px;
  }
}
</style>
