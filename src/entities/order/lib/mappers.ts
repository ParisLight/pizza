import type { IOrder } from "@/entities/order";
import type { OrderInsertDTO } from "@/entities/order/api/dto";

export const mapOrderToInsert = (order: IOrder): OrderInsertDTO => {
  return {
    ...order,
    available_intercom: order.availableIntercom,
    delivery_address: order.deliveryAddress,
    delivery_time: order.deliveryTime,
    delivery_type: order.deliveryType,
    user_id: order.userId,
    payer_number: order.payerNumber,
    payment_type: order.paymentType,
    created_at: order.createdAt,
  }
}
