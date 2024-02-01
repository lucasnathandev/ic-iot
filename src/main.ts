import { createApp } from "vue";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/pt-BR";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js

import * as VueRouter from "vue-router";

import App from "./App.vue";
import { createPinia } from "pinia";
import { routes } from "./router";

const pinia = createPinia();

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
});
app.use(router);
app.use(pinia);

app.mount("#app");
