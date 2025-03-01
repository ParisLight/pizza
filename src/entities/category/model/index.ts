import { defineStore } from "pinia";
import type { ICategory, ICategoryModel } from "./types";

export const useCategoryModel = defineStore( {
  id: 'category',
  state: () =>
    <ICategoryModel>{
      categories: [
        {id: 1, icon: '', name: 'Пицца'},
        {id: 2, icon: '', name: 'Напитки'},
        {id: 3, icon: '', name: 'Снеки'},
        {id: 4, icon: '', name: 'Напитки'},
        {id: 5, icon: '', name: 'Пицца'},
        {id: 6, icon: '', name: 'Напитки'},
        {id: 7, icon: '', name: 'Снеки'}]
    },

  actions: {

  }
})