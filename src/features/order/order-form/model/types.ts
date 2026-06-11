import { DeliveryType, PaymentType, type TimeSlot } from "@/entities/order"

export interface OrderFormValues {
  payerName: string
  payerNumber: string
  deliveryType: DeliveryType
  paymentType: PaymentType
  deliveryAddress: string
  dontRingIntercom: boolean
  floor: string
  flat: string
  readyBy: TimeSlot | null
  deliveryTime: TimeSlot | null
  orderComment: string
}
