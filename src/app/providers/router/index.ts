import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/app/providers/router/routes.ts";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})