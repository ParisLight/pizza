import type { OrderFormValues } from "../model"
import { DeliveryType, PaymentType } from "@/entities/order"

export const getEmptyOrderForm = (): OrderFormValues => {
  return {
    payerName: "",
    payerNumber: "",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    deliveryAddress: "",
    dontRingIntercom: false,
    floor: "",
    flat: "",
    orderComment: "",
    readyBy: null,
    deliveryTime: null,
  }
}
