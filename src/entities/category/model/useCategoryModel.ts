import { defineStore } from "pinia"
import type { ICategory } from "./types.ts"
import * as CategoryApi from "../api"
import type { LoadingStatus } from "@/shared/config"
import { useAsyncStatus } from "@/shared/lib"

export const useCategoryModel = defineStore("category", {
  state: () => ({
    idActiveCategory: 1,
    categories: {} as Record<number, ICategory>,
    loadingStatus: "idle" as LoadingStatus,
  }),

  actions: {
    async fetchCategories() {
      const { startFetch, canFetch, finishFetch } = useAsyncStatus()

      if (!canFetch(this.loadingStatus)) return

      const hasData = !!Object.keys(this.categories)?.length
      const isFirstLoad = !hasData

      this.loadingStatus = startFetch()

      try {
        this.categories = await CategoryApi.fetchCategories()

        this.loadingStatus = finishFetch(Object.keys(this.categories)?.length, isFirstLoad)
      } catch {
        this.loadingStatus = "error"
      }
    },
    setActiveCategory(categoryId: number) {
      this.idActiveCategory = categoryId ? categoryId : 1
    },
  },
})
