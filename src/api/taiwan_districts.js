import axios from 'axios';
const taiwanDistricts = axios.create({
  baseURL: `${process.env.VUE_APP_CITY_API}`,
});

export const getTaiwanDistricts = () => taiwanDistricts.get();