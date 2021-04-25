import axios from 'axios';
const taiwanPork = axios.create({
  baseURL: `${process.env.VUE_APP_PORK_API}`,
});

export const getTaiwanPork = () => taiwanPork.get();