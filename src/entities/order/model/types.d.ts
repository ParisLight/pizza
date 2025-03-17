export interface IOrder {
  payer_name: string;
  payer_number: string;
  delivery_type: number;
  delivery_time?: number;
  delivery_address?: string;
  flat?: number;
  floor?: number;
  payment_type: number;
  available_intercom?: number;
  bonuses_sum?: number;
}

export interface IOrderModel {
  currentOrder: IOrder;
  ordersList: IOrder[];
}