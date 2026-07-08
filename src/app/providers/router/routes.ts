import type { RouteRecordRaw } from "vue-router"
import { ROUTES } from "@/shared/config"

export const routes: Array<RouteRecordRaw> = [
  {
    name: "main",
    path: ROUTES.mainPage,
    component: () => import("@/pages/main-page"),
  },
  {
    name: "order",
    path: ROUTES.order,
    component: () => import("@/pages/order-page"),
  },
  {
    name: "profile",
    path: ROUTES.profile,
    component: () => import("@/pages/profile-page"),
  },
  {
    name: "myOrders",
    path: ROUTES.myOrders,
    component: () => import("@/pages/my-orders"),
  },
  {
    name: "notFound",
    path: ROUTES.notFound,
    component: () => import("@/pages/not-found"),
  },
]
