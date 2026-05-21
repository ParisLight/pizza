export enum DeliveryType {
  DELIVERY = 1,
  PICKUP = 2
}

export enum PaymentType {
  CARD = 1,
  CASH = 2
}

export interface DeliveryTimeSlot {
  id: string
  name: string
  from: Date
  to: Date
  isToday: boolean
}

export interface IOrder {
  id: number | null;
  payerName: string
  payerNumber: string;
  deliveryType: DeliveryType;
  deliveryTime: number | null;
  deliveryAddress: string;
  flat: number | null;
  floor: number | null;
  paymentType: PaymentType;
  dontRingIntercom: boolean;
  userId: number | null;
  createdAt: number | null; // todo: kick
  orderComment: string;
  // bonusesSum?: number;
}
