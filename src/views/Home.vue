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
      setLeaf();
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

      // 電腦版才顯示效果
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

    // 葉子亂數
    const setLeaf = () => {
      const banner = document.querySelector(".banner");
      const leaf = document.querySelector(".leaf");
      setInterval(() => {
        const translateX = Math.floor(Math.random() * 1920 + 1); // 亂數位子
        const animationTime = Math.random() * 8 + 3; // 亂數動畫時間
        const rotate = Math.random() * 360; // 亂數動畫旋轉
        const width = Math.random() * 100 + 30; // 亂數寬度
        const copyLeaf = leaf.cloneNode(true); // copy
        copyLeaf.style.left = `${translateX}px`;
        copyLeaf.style.animationDuration = `${animationTime}s`;
        copyLeaf.style.width = `${width}px`;
        copyLeaf.children[0].style.transform = `rotate(${rotate}deg)`;
        banner.append(copyLeaf);
        setTimeout(() => {
          copyLeaf.remove();
        }, 10000);
      }, 1000);
    };

    const scrollDown = () => {
      const banner = document.querySelector(".banner");
      window.scrollTo({ top: banner.offsetHeight, behavior: "smooth" });
    };

    return { domContent, domMoveBox, scrollDown };
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
    <div class="leaf">
      <img src="@/assets/images/leaf.png" />
    </div>
    <div class="arrow" @click="scrollDown">
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
  overflow: hidden;
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
    z-index: 1;
  }
}
.pig {
  height: 50vh;
}
.title_box {
  padding-top: 5vh;
  position: relative;
  z-index: 1;
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
  left: calc(50% - 5px);
  bottom: 0;
  width: 10px;
  font-size: 4vh;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &:hover {
    color: #fff;
  }
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
.leaf {
  width: 100px;
  position: absolute;
  top: -200px;
  animation-name: leaf;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  opacity: 1;
  img {
    max-width: 100%;
  }
}
@keyframes leaf {
  0% {
    transform: translateY(0);
  }
  50% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
