import { PaymentType, DeliveryType } from '@/entities/order'
import { type OrderFormValues } from './types'

export const createOrderFormValues = (): OrderFormValues => ({
  payerName: "",
  payerNumber: "",
  deliveryType: DeliveryType.DELIVERY,
  paymentType: PaymentType.CARD,
  deliveryAddress: '',
  dontRingIntercom: false,
  floor: '',
  flat: '',
  deliveryTime: '',
  orderComment: ''
})
