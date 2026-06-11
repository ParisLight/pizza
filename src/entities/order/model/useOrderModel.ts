import { defineStore } from "pinia"
import type { IOrder, IOrderDraft } from "./types"
import * as OrderApi from "../api"

export const useOrderModel = defineStore("order", {
  state: () => ({
    // currentOrder: <IOrder>{ todo: draft order
    //   payerName: "",
    //   payerNumber: "",
    //   deliveryType: 1,
    //   paymentType: 1,
    // },
    ordersList: [] as IOrder[],
  }),

  actions: {
    async sendOrder(order: IOrderDraft): Promise<number | null> {
      return await OrderApi.sendOrder(order)
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
