import { defineStore } from 'pinia'
import type { IProductModel, IProduct } from "./types";
import PizzaIcon from '@/assets/images/pizza.png';

export const useProductModel = defineStore({
  id: 'product',

  state: () => <IProductModel>{
    products: [
      {
        id: 1,
        img: PizzaIcon,
        name: "Пепперони",
        weight: "100гр",
        price: 500,
        description: 'пепперони, моцарелла, томатный соус, сливочный соус, орегано.',
        nutrition: {
          fats: 12,
          carbs: 23,
          kcal: 330,
          proteins: 20
        }
      },
      {
        id: 2,
        img: PizzaIcon,
        name: 'Пепперони2',
        weight: '100гр',
        price: 500,
        description: 'пепперони, моцарелла, томатный соус, сливочный соус, орегано.',
        nutrition: {
          fats: 12,
          carbs: 14,
          kcal: 330,
          proteins: 20
        }
      },
      {
        id: 3,
        img: PizzaIcon,
        name: 'Пепперони3',
        weight: '100гр',
        price: 500,
        description: 'пепперони, моцарелла, томатный соус, сливочный соус, орегано.',
        nutrition: {
          fats: 12,
          carbs: 12,
          kcal: 330,
          proteins: 20
        }
      }
    ],
    product: {},
    searchQuery: ''
  },
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  },
  getters: {
    filteredProducts(): IProduct[] {
      if(!this.searchQuery) return this.products

      return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
})