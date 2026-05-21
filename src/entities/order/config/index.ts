import { DeliveryType, PaymentType } from "@/entities/order";

export const DELIVERY_OPTIONS = [
  {
    id: DeliveryType.DELIVERY,
    name: 'доставка'
  },
  {
    id: DeliveryType.PICKUP,
    name: 'самовывоз'
  }
]

export const PAYMENT_OPTIONS = [
  {
    id: PaymentType.CARD,
    name: 'Карта',
  },
  {
    id: PaymentType.CASH,
    name: 'Наличные',
  },
]
