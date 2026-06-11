import type { IOrder } from "@/entities/order"
import type { OrderDTO, OrderInsertDTO } from "@/entities/order/api/dto"

export const mapOrderToInsert = (order: IOrder): OrderInsertDTO => {
  return {
    user_id: order.userId,
    flat: order.flat,
    floor: order.floor,
    dont_ring_intercom: order.dontRingIntercom,
    delivery_address: order.deliveryAddress,
    delivery_type: order.deliveryType,
    payer_number: order.payerNumber,
    payment_type: order.paymentType,
    // created_at: order.createdAt,
    order_comment: order.orderComment,
    delivery_time_from: order.deliveryTimeFrom,
    delivery_time_to: order.deliveryTimeTo,
    ready_by_from: order.readyByFrom,
    ready_by_to: order.readyByTo,
  }
}

export const mappedOrder = (order: OrderDTO): IOrder => {
  return {
    createdAt: order.created_at,
    userId: order.user_id,
    orderId: order.id,
    deliveryAddress: order.delivery_address,
    deliveryType: order.delivery_type,
    deliveryTimeFrom: order.delivery_time_from,
    orderComment: order.order_comment ?? "",
    payerNumber: order.payer_number,
    paymentType: order.payment_type,
    deliveryTimeTo: order.delivery_time_to,
    dontRingIntercom: order.dont_ring_intercom,
    readyByTo: order.ready_by_to,
    readyByFrom: order.ready_by_from,
    payerName: order.payer_name ?? "",
    flat: order.flat,
    floor: order.floor,
  }
}
