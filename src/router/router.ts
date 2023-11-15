import { RouteRecordRaw, useRouter } from "vue-router";
import Home from "../views/Home.vue";
import DashBoard from "../views/DashBoard.vue";
import BoxData from "../views/BoxDataView.vue";
import BoxDataInfoViewVue from "../views/BoxDataInfoView.vue";

const authGuard = () => {
  const token = localStorage.getItem("jwt");
  if (token) useRouter().push("/");
};

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/dashboard", component: DashBoard, beforeEnter: authGuard },
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
