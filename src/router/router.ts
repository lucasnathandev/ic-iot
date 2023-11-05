import { RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import DashBoard from "../views/DashBoard.vue";
import BoxData from "../components/BoxData.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/dashboard", component: DashBoard },
  { path: "/iot-box/:id", component: BoxData },
];
