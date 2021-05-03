<script>
import Navigation from "@/components/Navigation.vue";
import Restaurant from "@/components/Restaurant.vue";
import { onMounted, ref } from "vue";
export default {
  components: {
    Navigation,
    Restaurant,
  },
  setup() {
    const domContent = ref(null);
    const domMoveBox = ref(null);

    onMounted(() => {
      domToMove();
    });

    const domToMove = () => {
      const content = domContent.value;
      const moveBox = domMoveBox.value;
      const walk = 20; // 最大移動距離

      let boxInitTop = parseInt(window.getComputedStyle(moveBox)["top"]);
      let boxInitLeft = parseInt(window.getComputedStyle(moveBox)["left"]);

      function translate(e) {
        const {
          offsetWidth: contentWidth,
          offsetHeight: contentHeight,
        } = content;
        let { clientX: x, clientY: y } = e;

        const xWalk = Math.round((x / contentWidth) * walk);
        const yWalk = Math.round((y / contentHeight) * walk);

        moveBox.style.top = `${-yWalk * 1 + boxInitTop}px`;
        moveBox.style.left = `${-xWalk * 1 + boxInitLeft}px`;
      }

      const doResize = () => {
        if (window.innerWidth > 768) {
          window.addEventListener("mousemove", translate);
        } else {
          window.removeEventListener("mousemove", translate);
        }
      };

      doResize();
      window.addEventListener("resize", doResize);
    };

    return { domContent, domMoveBox };
  },
};
</script>

<template>
  <div class="banner">
    <div class="title_box">
      <img
        src="@/assets/images/taiwanpork_logo.png"
        class="title_logo animate__animated animate__bounceIn"
      />
      <h1 class="title animate__animated animate__fadeInUp">
        臺灣豬證明標章商家資料查詢
      </h1>
      <h2
        class="title_en animate__animated animate__fadeInUp animate__delay-1s"
      >
        TAIWAN PORK
      </h2>
    </div>
    <div ref="domContent" class="move_box">
      <div class="pig_box" ref="domMoveBox">
        <img src="@/assets/images/pig.png" class="pig moveImg girl1" />
      </div>
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
  position: relative;
}
.move_box {
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 14vh;
  @media screen and (min-width: 768px) {
    width: 500px;
    height: 700px;
    position: relative;
    top: 0;
    display: block;
    margin: 0 auto;
  }
}
.pig_box {
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 100px;
    left: calc(50% - 65px);
  }
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
