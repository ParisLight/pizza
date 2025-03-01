import type { RouteRecordRaw } from "vue-router";
import { routesMap } from "./constants.ts";

export const routes: Array<RouteRecordRaw> = [
    {
        path: routesMap.mainPage,
        component: () => import('@/pages/mainPage')
    }
]