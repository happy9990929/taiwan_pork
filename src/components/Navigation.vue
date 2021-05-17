<script>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useAnimate } from "@/composition-api";
export default {
  setup() {
    const store = useStore();
    const twZip = reactive({ city: [], area: [] }); // 所有城市、地區
    let taiwanDistricts; // 所有行政區
    const zipActive = reactive({ city: "", area: "" }); // 選中的城市、地區
    const cityGroup = ref(null); // 手機版城市
    const areaGroup = ref(null); // 手機版地區
    let showOptions = ref(false); // 手機版城市選項
    let showOptions_type = ref(false); // 手機版類型選項
    const mobileSelect = ref(null);
    const marketType = reactive([]);
    const hasMarket = computed(() => {
      return store.getters.hasMarket;
    });
    const navBar = ref(null);
    const type_options = ref(null);
    const type_options_m = ref(null);

    onMounted(() => {
      // 取得城市
      store.dispatch("handGetDistricts").then((res) => {
        taiwanDistricts = res;
        taiwanDistricts.forEach((item, i) => {
          twZip.city.push(taiwanDistricts[i].name);
        });
      });
      // 動畫
      useAnimate(navBar.value, "animate__fadeInUp");
    });

    watch(
      // 監控選中的城市，並返回該值地區
      () => zipActive.city,
      (newCity) => {
        const newArr = taiwanDistricts.filter((item) => item.name === newCity);
        zipActive.area = "";
        twZip.area = newArr[0].districts;
        store.dispatch("handCityActive", newCity);
      }
    );

    watch(
      // 監控選中的地區
      () => zipActive.area,
      (newArea) => {
        store.dispatch("handAreaActive", newArea);
      }
    );

    // 送出按鈕
    const submitBtn = () => {
      store.getters.submit();
      showOptions.value = false;
      showOptions_type.value = false;
      mobileSelect.value.classList.remove("show_options_box");
    };
    // 選中的城市
    const getActiveCity = (item, e) => {
      zipActive.city = item;
      cityGroup.value.children.forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
    };
    // 選中的區域
    const getActiveArea = (item, e) => {
      zipActive.area = item;
      areaGroup.value.children.forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
    };
    //重置按鈕
    const resetBtn = () => {
      areaGroup.value.children.forEach((item) => {
        item.classList.remove("active");
      });
      cityGroup.value.children.forEach((item) => {
        item.classList.remove("active");
      });
    };
    // 手機板選地區
    const toggleOptions = () => {
      showOptions.value = !showOptions.value;
      if (showOptions.value) {
        showOptions_type.value = false;
        mobileSelect.value.classList.add("show_options_box");
      } else {
        mobileSelect.value.classList.remove("show_options_box");
      }
    };
    // 手機板選類型
    const toggleOptions_type = () => {
      showOptions_type.value = !showOptions_type.value;
      if (showOptions_type.value) {
        showOptions.value = false;
        mobileSelect.value.classList.add("show_options_box");
      } else {
        mobileSelect.value.classList.remove("show_options_box");
      }
    };
    // 手機板隱藏選項
    const hideOptions = () => {
      showOptions.value = false;
      showOptions_type.value = false;
      mobileSelect.value.classList.remove("show_options_box");
    };

    //選擇類型
    const showMarket = (type, e) => {
      store.dispatch("handShowMarket", type);
      type_options.value.children.forEach((item) => {
        item.classList.remove("active");
      });
      type_options_m.value.children.forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
    };

    return {
      twZip,
      zipActive,
      submitBtn,
      getActiveCity,
      getActiveArea,
      cityGroup,
      areaGroup,
      resetBtn,
      showOptions,
      toggleOptions,
      mobileSelect,
      hideOptions,
      marketType,
      showMarket,
      toggleOptions_type,
      showOptions_type,
      hasMarket,
      navBar,
      type_options,
      type_options_m,
    };
  },
};
</script>
<template>
  <div class="desktop_show">
    <div class="desktop_nav" ref="navBar">
      <div class="text_logo">
        TAIWAN PORK
      </div>
      <form class="select_box">
        <div class="form_group">
          <label>城市</label>
          <select class="select_option" v-model="zipActive.city">
            <option disabled value="">請選擇縣市</option>
            <option v-for="item in twZip.city" :key="item" :value="item">{{
              item
            }}</option>
          </select>
        </div>
        <div class="form_group">
          <label>地區</label>
          <select class="select_option" v-model="zipActive.area">
            <option disabled value="">請選擇地區</option>
            <option
              v-for="item in twZip.area"
              :key="item.name"
              :value="item.name"
              >{{ item.name }}</option
            >
          </select>
        </div>
        <button type="button" class="submit_btn" @click="submitBtn">
          送出
        </button>
      </form>
      <a
        href="https://taiwanpork.coa.gov.tw/"
        class="apply_link"
        target="_blank"
      >
        <img src="@/assets/images/taiwanpork_logo.png" class="apply_logo" />
        申請商標
      </a>
    </div>
  </div>

  <div class="desktop_show" v-if="hasMarket">
    <ul class="type_options" ref="type_options">
      <li @click="showMarket('all', $event)" class="active">全部</li>
      <li @click="showMarket('food', $event)">餐飲</li>
      <li @click="showMarket('sell', $event)">販售</li>
      <li @click="showMarket('others', $event)">其他</li>
    </ul>
  </div>

  <div class="mobile_show" ref="mobileSelect" @click.self="hideOptions">
    <div class="options_box">
      <div class="option_box" @click="toggleOptions">
        城市
        <span class="caret_icon"><i class="fas fa-caret-down"></i></span>
      </div>
      <div class="option_box" @click="toggleOptions_type">
        類型
        <span class="caret_icon"><i class="fas fa-caret-down"></i></span>
      </div>
    </div>
    <div v-show="showOptions">
      <div class="options_line">
        <ul class="show_options" ref="cityGroup">
          <li
            v-for="item in twZip.city"
            :key="item"
            class="show_options_list"
            @click="getActiveCity(item, $event)"
          >
            {{ item }}
          </li>
        </ul>
        <ul class="show_options" ref="areaGroup">
          <li
            v-for="item in twZip.area"
            :key="item.name"
            class="show_options_list"
            @click="getActiveArea(item.name, $event)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="show_options_btns">
        <button class="show_options_btn reset" @click="resetBtn">重置</button>
        <button class="show_options_btn submit" @click="submitBtn">確定</button>
      </div>
    </div>
    <div v-show="showOptions_type">
      <div class="options_line">
        <ul class="show_options type_options_m" ref="type_options_m">
          <li class="show_options_list" @click="showMarket('all', $event)">
            全部
          </li>
          <li class="show_options_list" @click="showMarket('food', $event)">
            餐飲
          </li>
          <li class="show_options_list" @click="showMarket('sell', $event)">
            販售
          </li>
          <li class="show_options_list" @click="showMarket('others', $event)">
            其他
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desktop_nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  flex-flow: column;
  @media screen and (min-width: 1200px) {
    flex-flow: row;
  }
}
.text_logo {
  font-size: 32px;
}
.select_box {
  display: flex;
  margin-top: 5vw;
  @media screen and (min-width: 1200px) {
    margin-top: 0;
  }
}
.form_group {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}
.select_option {
  color: #777777;
  height: 42px;
  width: 150px;
  margin-left: 15px;
  &:focus {
    outline: 0;
  }
}
.submit_btn {
  background-color: #b4be2b;
  background-image: linear-gradient(
    270deg,
    #b4be2b 50%,
    #eeff00 51%,
    #b4be2b 70%
  );
  background-size: 200% 200%;
  background-position-x: 100%;
  transition: all 0.2s ease;
  color: #fff;
  width: 150px;
  font-weight: bold;
  margin-left: 15px;
  &:hover {
    background-position-x: -5%;
  }
}
.apply_logo {
  width: 50px;
  margin-right: 10px;
}
.apply_link {
  display: flex;
  align-items: center;
  color: #000000;
  font-size: 21px;
  position: absolute;
  right: 2vw;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.15);
  }
  @media screen and (min-width: 1200px) {
    position: initial;
  }
}

.type_options {
  color: #b4be2b;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  width: 35%;
  margin: 100px auto 20px;
  li {
    cursor: pointer;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom-color: #838d01;
      color: #838d01;
    }
  }
  .active {
    border-bottom-color: #b4be2b;
  }
}
.desktop_show {
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
}
.mobile_show {
  @media screen and (min-width: 768px) {
    display: none;
  }
}
.options_box {
  display: flex;
  background-color: #fff;
  color: #777777;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  height: 12vw;
  line-height: 12vw;
  text-align: center;
}
.option_box {
  width: 100%;
  border-right: 1px solid #e7e7e7;
  &:last-child {
    border-right: none;
  }
}
.caret_icon {
  margin-left: 5px;
}
.show_options_box {
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10;
}
.options_line {
  border-top: 1px solid #777777;
  display: flex;
}
.show_options {
  background-color: #fff;
  text-align: center;
  margin-top: 1px;
  width: 50%;
  height: 50vh;
  overflow-y: auto;
  &:nth-child(2n) {
    background-color: #f5f5f5;
  }
  &.type_options_m {
    width: 100%;
    height: auto;
  }
}
.show_options_list {
  border-bottom: 1px solid #ebedf0;
  height: 11vw;
  line-height: 11vw;
  &.active {
    background-color: #f7f8d7;
  }
}
.show_options_btns {
  text-align: center;
  background-color: #fff;
}
.show_options_btn {
  padding: 2vw 10vw;
  margin: 3vw;
  &.reset {
    background-color: #f5f5f5;
  }
  &.submit {
    background-color: #b4be2b;
    color: #fff;
  }
}
</style>
