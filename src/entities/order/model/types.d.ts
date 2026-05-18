export interface IOrder {
  id: number | null;
  payerName: string
  payerNumber: string;
  deliveryType: number;
  deliveryTime: number;
  deliveryAddress: string;
  flat: number | null;
  floor: number | null;
  paymentType: number;
  availableIntercom: boolean;
  userId: number
  createdAt: number | null; // todo: kick
  // bonusesSum?: number;
}
