import { defineStore } from "pinia"
import * as CartApi from "../api"
import type { ICartItem } from "./types"
import type { LoadingStatus } from "@/shared/config"
import { canFetch, finishFetch, startFetch } from "@/shared/lib"
import { createPersistDebouncer } from "@/entities/cart/model/createPersistDebouncer.ts"

const cartPersist = createPersistDebouncer(async (userId: number) => {
  const store = useCartModel()
  await store.persistCartSilent(userId)
})

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

    schedulePersistCart(userId: number) {
      cartPersist.schedule(userId)
    },

    async persistCartImmediate(userId: number) {
      cartPersist.cancel()
      await this.persistCart(userId)
    },

    async flushPersistCart(userId: number) {
      await cartPersist.flush(userId)
    },

    async addToCart(productId: number | undefined, userId: number | undefined) {
      if (!userId || !productId) {
        throw new Error("Failed to add item")
      }

      const item = this.items[productId]

      if (item) {
        item.quantity += 1
      } else {
        this.items[productId] = {
          productId,
          quantity: 1,
        }
      }

      this.schedulePersistCart(userId)
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

    async persistCartSilent(userId: number) {
      try {
        await this.persistCart(userId)
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("[cart] persist failed:", error)
        }
      }
    },

    removeManyFromCart(productIds: number[]) {
      for (const id of productIds) {
        delete this.items[id]
      }
    },

    async removeManyFromCartAndPersist(productIds: number[], userId: number | undefined) {
      if (!userId) {
        throw new Error("Failed to remove items")
      }

      this.removeManyFromCart(productIds)
      await this.persistCartImmediate(userId)
    },

    async removeFromCart(productId: number | undefined, userId: number | undefined) {
      if (!productId || !userId) {
        throw new Error("Failed to remove item")
      }

      const item = this.items[productId]

      if (item && item.quantity > 1) {
        item.quantity -= 1
        this.schedulePersistCart(userId)
      } else {
        await this.removeCompletelyFromCart(productId, userId)
      }
    },

    async clearCart(userId: number | undefined) {
      if (!userId) {
        throw new Error("Failed to clear cart")
      }

      this.items = {}
      await this.persistCartImmediate(userId)
    },

    async removeCompletelyFromCart(productId: number | undefined, userId: number | undefined) {
      if (!productId || !userId) {
        throw new Error("Failed to remove item")
      }

      if (this.items[productId]) {
        delete this.items[productId]
      }

      this.schedulePersistCart(userId)
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
