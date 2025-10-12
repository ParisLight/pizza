import { defineStore } from "pinia";
import type { ICategoryModel, ICategory } from "./types";

export const useCategoryModel = defineStore( 'category', {
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
    },
    getCategoryById(categoryId: number): ICategory | null {
      console.log(categoryId, 'category_id')
      console.log(this.categories, 'categories_')
      const category = this.categories.find(category => category.id === categoryId)

      return category || null
    }
  }
})