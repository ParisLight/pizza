import { defineStore } from 'pinia'
import type { ICartModel } from "./types";
import { CartApi } from '../index'

export const useCartModel = defineStore( {
  id: 'cart',
  state: () =>
    <ICartModel>{
      items: [],
      cartId: null
    },

  actions: {
    async fetchCart (userId) {
      const cartIdOutput = await CartApi.fetchCartId(userId)
      if(!cartIdOutput || !cartIdOutput.length) return

      this.cartId = cartIdOutput[0].id

      const output = await CartApi.fetchCart(this.cartId)

      if(!output || !output.length) return

      this.items = output
    },
    addToCart(productId: number | string) {
      const item = this.items.find(item => item.product_id === productId)
      if(item) {
        item.quantity += 1
      } else {
        this.items.push({
          product_id: productId,
          quantity: 1
        })
      }
      CartApi.updateCart(this.cartId, this.items)
    },
    removeFromCart(productId: number | string) {
      const item = this.items.find(item => item.product_id === productId)
      if(item && item.quantity > 1) {
        item.quantity -= 1
        CartApi.updateCart(this.cartId, this.items)
      } else {
        this.removeCompletelyFromCart(productId)
      }
    },
    removeCompletelyFromCart(productId: number | string) {
      const item = this.items.find(item => item.product_id === productId)
      if(item) {
        this.items = this.items.filter(item => item.product_id !== productId)
        CartApi.updateCart(this.cartId, this.items)
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