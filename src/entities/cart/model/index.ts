import { defineStore } from 'pinia'
import type { ICartModel } from "./types";

export const useCartModel = defineStore( {
  id: 'cart',
  state: () =>
    <ICartModel>{
      items: []
    },

  actions: {
    addToCart(productId: number | string) {
      const item = this.items.find(item => item.productId === productId)
      if(item) {
        item.quantity += 1
      } else {
        this.items.push({ productId, quantity: 1 })
      }
    },
    removeFromCart(productId: number | string) {
      const item = this.items.find(item => item.productId === productId)
      if(item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        this.removeCompletelyFromCart(productId)
      }
    },
    removeCompletelyFromCart(productId: number | string) {
      const item = this.items.find(item => item.productId === productId)
      if(item) {
        this.items = this.items.filter(item => item.productId !== productId)
      }
    }
  },
  getters: {
    totalQuantityCart(): number {
      if(!this.items.length) return 0

      const totalQuantity = this.items.reduce((acc, curr) => acc + curr.quantity, 0)

      return totalQuantity ? totalQuantity : 0
    }
  }
})