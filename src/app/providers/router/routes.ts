import type { RouteRecordRaw } from "vue-router"
import { ROUTES } from "@/shared/config"

export const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.mainPage,
    component: () => import("@/pages/main-page"),
  },
  {
    path: ROUTES.order,
    component: () => import("@/pages/order-page"),
  },
  {
    path: ROUTES.profile,
    component: () => import("@/pages/profile-page"),
  },
  {
    path: ROUTES.myOrders,
    component: () => import("@/pages/my-orders"),
  },
]
