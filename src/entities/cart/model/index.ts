import { defineStore } from "pinia"
import { CartApi } from "../index"
import type { ICartItem } from "./types"
import type { PaginatedStatus } from "@/shared/config"
import { useAsyncStatus } from "@/shared/lib"

export const useCartModel = defineStore("cart", {
  state: () => ({
    items: [] as ICartItem[],
    cartId: null as number | null,
    loadingStatus: "idle" as PaginatedStatus,
  }),

  actions: {
    async fetchCart(userId: number) {
      const { startFetch, canFetch, finishFetch } = useAsyncStatus()

      if (!canFetch(this.loadingStatus)) return

      const hasData = !!this.items.length
      const isFirstLoad = !hasData

      this.loadingStatus = startFetch(this.loadingStatus, hasData)

      try {
        const cartIdOutput = await CartApi.fetchCartId(userId)
        if (!cartIdOutput || !cartIdOutput.length) return

        this.cartId = cartIdOutput[0].id

        if (!this.cartId) return

        const output = await CartApi.fetchCart(this.cartId)

        this.items = output ?? []

        this.loadingStatus = finishFetch(this.items?.length, isFirstLoad)
      } catch {
        this.loadingStatus = "error"
      }
    },

    addToCart(productId: number) {
      const item = this.items.find((item) => item.productId === productId)

      if (item) {
        item.quantity += 1
      } else {
        this.items.push({
          productId: productId,
          quantity: 1,
        })
      }
    },

    async syncCart() {
      if (!this.cartId) return
      this.items = await CartApi.updateCart(this.cartId, this.items)
    },

    removeFromCart(productId: number) {
      const item = this.items.find((item) => item.productId === productId)

      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        this.removeCompletelyFromCart(productId)
      }
    },

    clearCart() {
      this.items = [] as ICartItem[]
    },

    removeCompletelyFromCart(productId: number | string) {
      const item = this.items.find((item) => item.productId === productId)

      if (item) {
        this.items = this.items.filter((item) => item.productId !== productId)
      }
    },
  },
  getters: {
    totalQuantityCart(): number {
      if (!this.items.length) return 0

      return this.items.reduce((acc, curr) => acc + curr.quantity, 0)
    },
  },
})
