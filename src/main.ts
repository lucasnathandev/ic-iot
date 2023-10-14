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
import Home from "./views/Home.vue";
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [{ path: "/", component: Home }],
});

const app = createApp(App);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
});
app.use(router);

app.mount("#app");
