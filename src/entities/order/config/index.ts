import { DeliveryType, PaymentType } from "../model"

export const DELIVERY_OPTIONS = [
  {
    id: DeliveryType.DELIVERY,
    name: "доставка",
  },
  {
    id: DeliveryType.PICKUP,
    name: "самовывоз",
  },
]

export const PAYMENT_OPTIONS = [
  {
    id: PaymentType.CARD,
    name: "карта",
  },
  {
    id: PaymentType.CASH,
    name: "наличные",
  },
]
