import { createStore } from 'vuex'
import { apiTaiwanDistricts, apiTaiwanPork } from '@/api'
export default createStore({
  state: {
    taiwanDistricts: [],
    restaurant: [],
    cityActive: "",
    areaActive: "",
    submit: Function,
    typeActive: "",
    hasMarket: false,
  },
  mutations: {
    getDistricts(state, payload) {
      state.taiwanDistricts = payload;
    },
    getRestaurant(state, payload) {
      state.restaurant = payload;
    },
    cityActive(state, payload) {
      state.cityActive = payload;
    },
    areaActive(state, payload) {
      state.areaActive = payload;
    },
    submit(state, payload) {
      state.submit = payload;
    },
    showMarket(state, payload) {
      state.typeActive = payload;
    },
    hasMarket(state, payload) {
      state.hasMarket = payload;
    }
  },
  actions: {
    async handGetDistricts({ commit }) {
      try {
        const res = await apiTaiwanDistricts();
        commit("getDistricts", res.data);
        return res.data
      } catch (error) {
        console.log(error);
      }
    },
    async handGetRestaurant({ commit }) {
      try {
        const res = await apiTaiwanPork();
        commit("getRestaurant", res.data);
        return res.data
      } catch (error) {
        console.log(error);
      }
    },
    handCityActive({ commit }, paylod) {
      commit("cityActive", paylod);
    },
    handAreaActive({ commit }, paylod) {
      commit("areaActive", paylod);
    },
    handSubmit({ commit }, paylod) {
      commit("submit", paylod);
    },
    handShowMarket({ commit }, paylod) {
      commit("showMarket", paylod);
    },
    handHasMarket({ commit }, paylod) {
      commit("hasMarket", paylod);
    }
  },
  getters: {
    taiwanDistricts(state) {
      return state.taiwanDistricts;
    },
    restaurant(state) {
      return state.restaurant;
    },
    cityActive(state) {
      return state.cityActive;
    },
    areaActive(state) {
      return state.areaActive;
    },
    submit(state) {
      return state.submit;
    },
    typeActive(state) {
      return state.typeActive;
    },
    hasMarket(state) {
      return state.hasMarket;
    }
  }
})
