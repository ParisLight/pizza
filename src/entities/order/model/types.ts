export enum DeliveryType {
  DELIVERY = 1,
  PICKUP = 2,
}

export enum PaymentType {
  CARD = 1,
  CASH = 2,
}

export interface TimeSlot {
  value: string
  label: string
  from: Date
  to: Date
  isToday: boolean
}

export interface IOrderDraft {
  userId: number

  payerName: string
  payerNumber: string

  deliveryType: DeliveryType
  deliveryAddress: string | null

  flat: number | null
  floor: number | null

  paymentType: PaymentType
  dontRingIntercom: boolean | null

  deliveryTimeFrom: string | null
  deliveryTimeTo: string | null

  readyByFrom: string | null
  readyByTo: string | null

  orderComment: string
}

export interface IOrder extends IOrderDraft {
  orderId: number
  userId: number
}
