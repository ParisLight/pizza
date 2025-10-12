import { defineStore } from 'pinia'
import type { ICartModel } from "./types";
import { CartApi } from '../index'
import { useDebounceFn } from '@vueuse/core'

export const useCartModel = defineStore( {
  id: 'cart',
  state: () =>
    <ICartModel> {
      items: [],
      cartId: null
    },

  actions: {
    async fetchCart (userId: number) {
      const cartIdOutput = await CartApi.fetchCartId(userId)
      if(!cartIdOutput || !cartIdOutput.length) return

      this.cartId = cartIdOutput[0].id

      const output = await CartApi.fetchCart(this.cartId)

      if(!output || !output.length) return

      this.items = output
    },
    async addToCart(productId: number): Promise<void> {
      const item = this.items.find(item => item.product_id === productId)

      if(item) {
        item.quantity += 1
      } else {
        this.items.push({
          product_id: productId,
          quantity: 1
        })
      }

      await this.debouncedUpdateCart()
    },
    async removeFromCart(productId: number): Promise<void> {
      const item = this.items.find(item => item.product_id === productId)

      if(item && item.quantity > 1) {
        item.quantity -= 1
        await this.debouncedUpdateCart()
      } else {
        await this.removeCompletelyFromCart(productId)
      }
    },
    async removeCompletelyFromCart(productId: number | string) {
      const item = this.items.find(item => item.product_id === productId)

      if(item) {
        this.items = this.items.filter(item => item.product_id !== productId)
        await CartApi.updateCart(this.cartId, this.items)
      }
    },
    debouncedUpdateCart: useDebounceFn(async function() {
      await CartApi.updateCart(this.cartId, this.items)
    }, 300)
  },
  getters: {
    totalQuantityCart(): number {
      if(!this.items.length) return 0

      const totalQuantity = this.items.reduce((acc, curr) => acc + curr.quantity, 0)

      return totalQuantity ? totalQuantity : 0
    }
  }
})