import { defineStore } from "pinia"
import type { IOrder, IOrderDraft, IOrderItemInput } from "./types"
import * as OrderApi from "../api"
import type { LoadingStatus } from "@/shared/config"
import { useAsyncStatus } from "@/shared/lib"

export const useOrderModel = defineStore("order", {
  state: () => ({
    ordersList: [] as IOrder[],
    loadingStatus: "idle" as LoadingStatus,
  }),

  actions: {
    async sendOrder(order: IOrderDraft, orderItems: IOrderItemInput[]): Promise<number> {
      const orderId = await OrderApi.sendOrder(order, orderItems)

      if (!orderId) {
        throw new Error("Cant create the order")
      }

      return orderId
    },
    async loadOrders(userId: number | undefined) {
      const { startFetch, canFetch, finishFetch } = useAsyncStatus()

      const hasData = !!this.ordersList?.length

      if (!userId) return

      if (!canFetch(this.loadingStatus)) return

      const isFirstLoad = !hasData

      this.loadingStatus = startFetch()

      try {
        const orders = await OrderApi.fetchOrders(userId)

        this.ordersList = orders || []
        this.loadingStatus = finishFetch(this.ordersList?.length, isFirstLoad)
      } catch {
        this.loadingStatus = "error"
      }
    },
  },
})
