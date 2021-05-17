<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    let restaurant = reactive([]); // 所有商家
    const market_city = reactive([]); // 選中地區後的商家
    let cityActive = ref(""); // 選中的城市
    let areaActive = ref(""); // 選中的地區
    let typeActive = ref("all"); // 選中的類型
    let hasMarket = ref(false);
    let hasType = ref(true);

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
      restaurant.forEach((item) => {
        if (
          item.addr.indexOf(cityActive.value) >= 0 &&
          item.addr.indexOf(areaActive.value) >= 0
        ) {
          market_city.push(item);
          if (market_city.length > 0) {
            hasType.value = true;
          } else {
            hasType.value = false;
          }
          hasMarket.value = true;
          store.dispatch("handHasMarket", hasMarket.value);
        }
      });
      if (market_city.length === 0) {
        hasType.value = false;
      }
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

    // 分類開關，typeActive變更時執行
    const showMarket = () => {
      const market = document.querySelectorAll(".restaurant_box");
      market.forEach((item) => {
        item.classList.remove("show");
      });
      document.querySelectorAll(`.${typeActive.value}`).forEach((item) => {
        item.classList.add("show");
      });
      if (typeActive.value === "all") {
        market.forEach((item) => {
          item.classList.add("show");
        });
      }
      // 查找有無對應的類型
      Array.from(market).find((item) => {
        return item.classList.contains(typeActive.value)
          ? (hasType.value = true)
          : (hasType.value = false);
      });
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

    return {
      restaurant,
      market_city,
      typeStyle,
      hasType,
    };
  },
};
</script>
<template>
  <div class="restaurants_box">
    <transition-group name="fade">
      <div
        v-for="item in market_city"
        :key="item.case_code"
        :class="['restaurant_box', typeStyle(item.type), 'all', 'show']"
      >
        <div class="restaurant">
          <div class="map_icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <a
            :href="`http://google.com/search?q=${item.market_name}`"
            class="name"
            target="_blank"
          >
            {{ item.market_name }}
          </a>
        </div>
        <a
          :href="`https://www.google.com.tw/maps/place/${item.addr}`"
          target="_blank"
          >{{ item.addr }}</a
        >
        <div>標章代碼: {{ item.badge_code }}</div>
      </div>
      <div class="no_market" v-if="hasType === false">
        查無資料
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
  a {
    color: #000;
    &:hover {
      color: #999;
    }
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
  display: block;
  font-size: 5vw;
  font-weight: bold;
  text-align: center;
  @media screen and (min-width: 768px) {
    font-size: 21px;
  }
}
.no_market {
  margin: 50px 0;
  text-align: center;
  width: 100%;
}
</style>
