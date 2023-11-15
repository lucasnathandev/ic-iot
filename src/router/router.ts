import { RouteRecordRaw, useRouter } from "vue-router";
import Home from "../views/HomeView.vue";
import DashBoard from "../views/DashBoardView.vue";
import BoxData from "../views/BoxDataView.vue";
import BoxDataInfoViewVue from "../views/BoxDataInfoView.vue";
import CreateAccountViewVue from "../views/CreateAccountView.vue";

const authGuard = () => {
  const token = localStorage.getItem("jwt");
  if (!token) useRouter().push("/");
};

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/dashboard", component: () => DashBoard, beforeEnter: authGuard },
  { path: "/new-account", component: CreateAccountViewVue },
  {
    path: "/iot-box/:id",
    component: BoxData,
    beforeEnter: authGuard,
    props: true,
  },
  {
    path: "/box-data/:id",
    component: BoxDataInfoViewVue,
    beforeEnter: authGuard,
    props: true,
  },
];
