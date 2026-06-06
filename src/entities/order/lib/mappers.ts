import type { IOrder } from "@/entities/order";
import type { OrderInsertDTO } from "@/entities/order/api/dto";

export const mapOrderToInsert = (order: IOrder): OrderInsertDTO => {
  return {
    ...order,
    dont_ring_intercom: order.dontRingIntercom,
    delivery_address: order.deliveryAddress,
    delivery_type: order.deliveryType,
    user_id: order.userId,
    payer_number: order.payerNumber,
    payment_type: order.paymentType,
    created_at: order.createdAt,
    order_comment: order.orderComment,
    delivery_time_from: order.deliveryTimeFrom,
    delivery_time_to: order.deliveryTimeTo,
    ready_by_from: order.readyByFrom,
    ready_by_to: order.readyByTo,
  }
}
