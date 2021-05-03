<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    let restaurant = reactive([]); // 所有商家
    let market_city = reactive([]); // 選中地區後的商家
    let cityActive = ref(""); // 選中的城市
    let areaActive = ref(""); // 選中的地區
    let typeActive = ref(""); // 選中的類型
    let hasMarket = ref(false);

    onMounted(() => {
      // 取得所有商家
      store.dispatch("handGetRestaurant").then((res) => {
        restaurant = res;
      });
    });

    watch(
      // 監控選中的城市
      () => store.getters.cityActive,
      (newVal) => {
        cityActive.value = newVal;
      }
    );

    watch(
      // 監控選中的地區
      () => store.getters.areaActive,
      (newVal) => {
        areaActive.value = newVal;
        store.dispatch("handSubmit", searchMarketCity);
      }
    );

    // 如符合選中的城市地區，將返回值
    const searchMarketCity = () => {
      market_city.length = 0;
      restaurant.forEach((item, i) => {
        if (
          item.addr.indexOf(cityActive.value) >= 0 &&
          item.addr.indexOf(areaActive.value) >= 0
        ) {
          market_city.push(item);
          hasMarket.value = true;
          store.dispatch("handHasMarket", hasMarket.value);
        }
      });
    };

    watch(
      // 監控商家類型
      () => store.getters.typeActive,
      (newVal) => {
        typeActive.value = newVal;
        console.log(typeActive.value);
        showMarket();
      }
    );

    // 分類開關
    const showMarket = () => {
      document.querySelectorAll(".restaurant_box").forEach((item) => {
        item.classList.remove("show");
      });
      document.querySelectorAll(`.${typeActive.value}`).forEach((item) => {
        item.classList.add("show");
      });
      if (typeActive.value === "all") {
        document.querySelectorAll(".restaurant_box").forEach((item) => {
          item.classList.add("show");
        });
      }
    };

    // 依類型加入class
    const typeStyle = (item) => {
      if (item === "餐飲") {
        return "food";
      } else if (item === "販售") {
        return "sell";
      } else {
        return "others";
      }
    };

    return { restaurant, market_city, typeStyle };
  },
};
</script>
<template>
  <div class="restaurants_box">
    <transition-group name="fade">
      <div
        :class="['restaurant_box', typeStyle(item.type), 'show']"
        v-for="item in market_city"
        :key="item.case_code"
      >
        <div class="restaurant">
          <div class="map_icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="name">{{ item.market_name }}</div>
        </div>
        <div>{{ item.addr }}</div>
        <div>標章代碼: {{ item.badge_code }}</div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  transform: translateY(0);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.restaurants_box {
  display: flex;
  flex-wrap: wrap;
}
.restaurant_box {
  background-color: #fffdf2;
  padding: 8vw;
  line-height: 7vw;
  width: 100%;
  display: none;
  @media screen and (min-width: 768px) {
    width: 33.3%;
    padding: 5%;
    line-height: 1.8;
  }
  @media screen and (min-width: 1200px) {
    width: 20%;
    padding: 3%;
  }
  &:nth-child(2n) {
    background-color: #f7f8d7;
  }
  &.show {
    display: block;
  }
}
.restaurant {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    display: block;
  }
}
.map_icon {
  color: #cf3636;
  font-size: 13vw;
  margin-right: 10px;
  @media screen and (min-width: 768px) {
    font-size: 42px;
    text-align: center;
  }
}
.name {
  font-size: 5vw;
  color: #000;
  font-weight: bold;
  text-align: center;
  @media screen and (min-width: 768px) {
    font-size: 21px;
  }
}
</style>
