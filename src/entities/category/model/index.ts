import { defineStore } from "pinia";
import type { ICategory } from "./types";
import * as CategoryApi from "../api"

export const useCategoryModel = defineStore( 'category', {
  state: () => ({
      idActiveCategory: 1,
      categories: {} as Record<number, ICategory>
    }),

  actions: {
    async fetchCategories() {
      this.categories = await CategoryApi.fetchCategories()
    },
    setActiveCategory(categoryId: number) {
      this.idActiveCategory = categoryId ? categoryId : 1
    },
  }
})
