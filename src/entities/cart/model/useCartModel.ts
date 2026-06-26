import { defineStore } from "pinia"
import { CartApi } from "../index"
import type { ICartItem } from "./types"
import type { LoadingStatus } from "@/shared/config"
import { useAsyncStatus } from "@/shared/lib"

export const useCartModel = defineStore("cart", {
  state: () => ({
    items: [] as ICartItem[],
    cartId: null as number | null,
    loadingStatus: "idle" as LoadingStatus,
  }),

  actions: {
    async fetchCart(userId: number) {
      const { startFetch, canFetch, finishFetch } = useAsyncStatus()

      if (!canFetch(this.loadingStatus)) return

      const hasData = !!this.items.length
      const isFirstLoad = !hasData

      this.loadingStatus = startFetch()

      try {
        await this.ensureCartId(userId)

        if (!this.cartId) return

        const output = await CartApi.fetchCart(this.cartId)

        this.items = output ?? []

        this.loadingStatus = finishFetch(this.items?.length, isFirstLoad)
      } catch {
        this.loadingStatus = "error"
      }
    },

    async addToCart(productId: number | undefined, userId: number | undefined) {
      if (!userId || !productId) {
        throw new Error("Failed to add item")
      }

      const item = this.items.find((item) => item.productId === productId)

      if (item) {
        item.quantity += 1
      } else {
        this.items.push({
          productId: productId,
          quantity: 1,
        })
      }

      await this.persistCart(userId)
    },
    async ensureCartId(userId: number) {
      if (this.cartId) return this.cartId

      const existingId = await CartApi.fetchCartIdByUser(userId)
      if (existingId) {
        this.cartId = existingId
        return this.cartId
      }

      const createdId = await CartApi.createCart(userId)
      if (!createdId) {
        throw new Error("Failed to create cart")
      }
      this.cartId = createdId
      return this.cartId
    },

    async persistCart(userId: number) {
      await this.ensureCartId(userId)

      if (!this.cartId) return

      this.items = await CartApi.updateCart(this.cartId, this.items)
    },

    removeManyFromCart(productIds: number[]) {
      const ids = new Set(productIds)
      this.items = this.items.filter((item) => !ids.has(item.productId))
    },

    async removeManyFromCartAndPersist(productIds: number[], userId: number | undefined) {
      if (!userId) {
        throw new Error("Failed to remove items")
      }

      this.removeManyFromCart(productIds)
      await this.persistCart(userId)
    },

    async removeFromCart(productId: number | undefined, userId: number | undefined) {
      if (!productId || !userId) {
        throw new Error("Failed to remove item")
      }

      const item = this.items.find((item) => item.productId === productId)

      if (item && item.quantity > 1) {
        item.quantity -= 1
        await this.persistCart(userId)
      } else {
        await this.removeCompletelyFromCart(productId, userId)
      }
    },

    async clearCart(userId: number | undefined) {
      if (!userId) {
        throw new Error("Failed to clear cart")
      }

      this.items = [] as ICartItem[]
      await this.persistCart(userId)
    },

    async removeCompletelyFromCart(productId: number | undefined, userId: number | undefined) {
      if (!productId || !userId) {
        throw new Error("Failed to remove item")
      }

      const item = this.items.find((item) => item.productId === productId)

      if (item) {
        this.items = this.items.filter((item) => item.productId !== productId)
      }

      await this.persistCart(userId)
    },
  },
  getters: {
    getProductQuantity: (state) => (productId: number) => {
      return state.items.find((item) => item.productId === productId)?.quantity ?? 0
    },
    isProductInCart: (state) => (productId: number) => {
      return (state.items.find((item) => item.productId === productId)?.quantity ?? 0) > 0
    },
    productIdsInCart(): number[] {
      return this.items.map((item) => item.productId)
    },
    totalQuantityCart(): number {
      if (!this.items.length) return 0

      return this.items.reduce((acc, curr) => acc + curr.quantity, 0)
    },
  },
})
