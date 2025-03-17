import { defineStore } from "pinia";
import { IOrder, IOrderModel } from "../index";
import { OrderApi } from '../index'

export const useOrderModel = defineStore({
  id: 'order',
  state: () =>
    <IOrderModel> {
      currentOrder: <IOrder> {
        payer_name: '',
        payer_number: '',
        delivery_type: 1,
        payment_type: 1
      },
      ordersList: []
    },

  actions: {
    async sendOrder() {

    }
  }
})