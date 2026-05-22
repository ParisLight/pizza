import { defineStore } from "pinia";
import type { IOrder } from "./types";
import * as OrderApi from "../api"

export const useOrderModel = defineStore('order', {
  state: () => ({
      currentOrder: <IOrder> {
        payerName: '',
        payerNumber: '',
        deliveryType: 1,
        paymentType: 1
      },
      ordersList: []
    }),

  actions: {
    async sendOrder(order: IOrder): Promise<number | null> {
      return await OrderApi.sendOrder(order)
    }
  }
})
