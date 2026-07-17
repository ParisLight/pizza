import { defineStore } from "pinia"
import * as CartApi from "../api"
import type { ICartItem } from "./types"
import type { LoadingStatus } from "@/shared/config"
import { canFetch, finishFetch, startFetch } from "@/shared/lib"

const cloneCartItems = (items: Record<number, ICartItem>): Record<number, ICartItem> =>
  Object.fromEntries(Object.entries(items).map(([id, item]) => [Number(id), { ...item }]))

export const useCartModel = defineStore("cart", {
  state: () => ({
    items: {} as Record<number, ICartItem>,
    cartId: null as number | null,
    loadingStatus: "idle" as LoadingStatus,
  }),

  actions: {
    async fetchCart(userId: number | undefined) {
      if (!userId) return

      if (!canFetch(this.loadingStatus)) return

      const hasData = !!Object.keys(this.items).length
      const isFirstLoad = !hasData

      this.loadingStatus = startFetch()

      try {
        await this.ensureCartId(userId)

        if (!this.cartId) {
          this.loadingStatus = "error"
          return
        }

        const output = await CartApi.fetchCart(this.cartId)

        this.items = output ?? {}

        this.loadingStatus = finishFetch(Object.keys(this.items).length, isFirstLoad)
      } catch {
        this.loadingStatus = "error"
      }
    },

    async addToCart(productId: number | undefined, userId: number | undefined) {
      if (!userId || !productId) {
        throw new Error("Failed to add item")
      }

      const snapshot = cloneCartItems(this.items)

      const item = this.items[productId]

      if (item) {
        item.quantity += 1
      } else {
        this.items[productId] = {
          productId,
          quantity: 1,
        }
      }

      try {
        await this.persistCart(userId)
      } catch (e) {
        this.items = snapshot
        throw e
      }
    },

    async ensureCartId(userId: number) {
      if (this.cartId) return this.cartId

      const existingId = await CartApi.fetchCartIdByUser(userId)

      if (existingId) {
        this.cartId = existingId
        return this.cartId
      }

      return null
    },

    async persistCart(userId: number) {
      await this.ensureCartId(userId)

      if (!this.cartId) return

      this.items = await CartApi.updateCart(this.cartId, this.items)
    },

    async removeFromCart(productId: number | undefined, userId: number | undefined) {
      if (!productId || !userId) {
        throw new Error("Failed to remove item")
      }

      const item = this.items[productId]

      if (item && item.quantity > 1) {
        const snapshot = cloneCartItems(this.items)

        item.quantity -= 1

        try {
          await this.persistCart(userId)
        } catch (e) {
          this.items = snapshot
          throw e
        }
      } else {
        await this.removeCompletelyFromCart([productId], userId)
      }
    },

    async clearCart(userId: number | undefined) {
      if (!userId || !this.cartId) {
        throw new Error("Failed to clear cart")
      }

      const snapshot = cloneCartItems(this.items)

      this.items = {}

      try {
        await CartApi.clearCart(this.cartId)
      } catch (e) {
        this.items = snapshot
        throw e
      }
    },

    async removeCompletelyFromCart(productIds: number[] | undefined, userId: number | undefined) {
      if (!productIds?.length || !userId || !this.cartId) {
        throw new Error("Failed to remove item")
      }

      const snapshot = cloneCartItems(this.items)

      productIds.forEach((productId) => {
        if (this.items?.[productId]) {
          delete this.items[productId]
        }
      })

      try {
        await CartApi.deletePositionsFromCart(this.cartId, productIds)
      } catch (e) {
        this.items = snapshot
        throw e
      }
    },
  },
  getters: {
    getProductQuantity: (state) => (productId: number) => {
      return state.items[productId]?.quantity ?? 0
    },
    isProductInCart: (state) => (productId: number) => {
      return (state.items[productId]?.quantity ?? 0) > 0
    },
    productIdsInCart(): number[] {
      return Object.keys(this.items).map(Number)
    },
    totalQuantityCart(): number {
      return Object.values(this.items).reduce((acc, curr) => acc + curr.quantity, 0)
    },
  },
})
