import { defineStore } from "pinia";
import type { ICategoryModel } from "./types";

export const useCategoryModel = defineStore( {
  id: 'category',
  state: () =>
    <ICategoryModel>{
      idActiveCategory: 1,
      categories: [
        {id: 1, icon: '', name: 'Пицца'},
        {id: 2, icon: '', name: 'Напитки'},
        {id: 3, icon: '', name: 'Снеки'}
      ]
    },

  actions: {
    setActiveCategory(categoryId: number) {
      this.idActiveCategory = categoryId ? categoryId : 1
    }
  }
})