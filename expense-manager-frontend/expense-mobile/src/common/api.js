import axios from "axios";

let store

export const injectStore = _store => {
  store = _store
}

const instance = axios.create({
  baseURL: "http://192.168.1.76:5000/api",
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + store.getState().user.token;
  return config;
})

export default instance;
