import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from "./App.vue";
import router from "./router";

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "./assets/main.css";
import { useUserStore } from "./stores/user-store";

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueAxios, axios)

const userStore = useUserStore();

axios.defaults.baseURL = 'http://dev-spring.com:8080';

// axios 인터셉터 추가
axios.interceptors.request.use((config) => {
  
  // 토큰이 있는경우 헤더에 추가 후 서버 요청..
  if (userStore && userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
  console.log('config.headers', config.headers);
  return config;
});

app.mount("#app");
