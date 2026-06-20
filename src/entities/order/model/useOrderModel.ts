import { defineStore } from "pinia"
import type { IOrder, IOrderDraft, IOrderItemInput } from "./types"
import * as OrderApi from "../api"
import type { PaginatedStatus } from "@/shared/config"
import { useAsyncStatus } from "@/shared/lib"

export const useOrderModel = defineStore("order", {
  state: () => ({
    ordersList: [] as IOrder[],
    loadingStatus: "idle" as PaginatedStatus,
  }),

  actions: {
    async sendOrder(order: IOrderDraft, orderItems: IOrderItemInput[]): Promise<number | null> {
      return await OrderApi.sendOrder(order, orderItems)
    },
    async loadOrders(userId: number | undefined) {
      const { startFetch, canFetch, finishFetch } = useAsyncStatus()

      if (!canFetch(this.loadingStatus)) return

      const hasData = !!this.ordersList?.length

      this.loadingStatus = startFetch(this.loadingStatus, hasData)

      if (!userId) return

      try {
        const orders = await OrderApi.fetchOrders(userId)

        this.ordersList = orders || []
        this.loadingStatus = finishFetch(this.ordersList?.length, hasData)
      } catch {
        this.loadingStatus = "error"
      }
    },
  },
})
