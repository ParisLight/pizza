import { defineStore } from "pinia"
import type { IOrder, IOrderDraft, IOrderItemInput } from "./types"
import * as OrderApi from "../api"

export const useOrderModel = defineStore("order", {
  state: () => ({
    ordersList: [] as IOrder[],
  }),

  actions: {
    async sendOrder(order: IOrderDraft, orderItems: IOrderItemInput[]): Promise<number | null> {
      return await OrderApi.sendOrder(order, orderItems)
    },
    async loadOrders(userId: number | undefined) {
      if (!userId) return

      const orders = await OrderApi.fetchOrders(userId)

      if (!orders) {
        this.ordersList = []
      } else {
        this.ordersList = orders
      }
    },
  },
})
