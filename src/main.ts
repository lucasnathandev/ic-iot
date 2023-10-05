import { createApp } from "vue";
import "./style.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as VueRouter from "vue-router";

import App from "./App.vue";
import Home from "./views/Home.vue";
import { pinia } from "./stores";
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [{ path: "/", component: Home }],
});

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");
