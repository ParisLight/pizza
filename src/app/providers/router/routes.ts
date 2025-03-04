import type { RouteRecordRaw } from "vue-router";
import { routesMap } from "./constants.ts";

export const routes: Array<RouteRecordRaw> = [
  {
    path: routesMap.mainPage,
    component: () => import('@/pages/mainPage'),
  },
  {
    path: routesMap.basket,
    component: () => import('@/pages/basket-page')
  },
  {
    path: routesMap.profile,
    component: () => import('@/pages/profile-page')
  }
]