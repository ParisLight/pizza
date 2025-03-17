import type { RouteRecordRaw } from "vue-router";
import { routesMap } from "./constants.ts";

export const routes: Array<RouteRecordRaw> = [
  {
    path: routesMap.mainPage,
    component: () => import('@/pages/main-page'),
  },
  {
    path: routesMap.cart,
    component: () => import('@/pages/cart-page')
  },
  {
    path: routesMap.profile,
    component: () => import('@/pages/profile-page')
  }
]