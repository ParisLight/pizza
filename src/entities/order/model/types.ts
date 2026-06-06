export enum DeliveryType {
  DELIVERY = 1,
  PICKUP = 2
}

export enum PaymentType {
  CARD = 1,
  CASH = 2
}

export interface TimeSlot {
  id: string
  name: string
  from: Date
  to: Date
  isToday: boolean
}

export interface IOrder {
  userId: number;

  payerName: string
  payerNumber: string;

  deliveryType: DeliveryType;
  deliveryAddress: string | null;

  flat: number | null;
  floor: number | null;

  paymentType: PaymentType;
  dontRingIntercom: boolean | null;

  deliveryTimeFrom: string | null;
  deliveryTimeTo: string | null;

  readyByFrom: string | null;
  readyByTo: string | null;

  createdAt: string;
  orderComment: string;
}
