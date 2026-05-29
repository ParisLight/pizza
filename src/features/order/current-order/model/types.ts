import { PaymentType, DeliveryType } from "@/entities/order";

export interface OrderFormValues {
  payerName: string
  payerNumber: string
  deliveryType: DeliveryType
  paymentType: PaymentType
  deliveryAddress?: string
  dontRingIntercom?: boolean
  floor?: string
  flat?: string
  deliveryTime?: string
  orderComment: string
}
