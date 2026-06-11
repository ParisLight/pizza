import type { IOrder, IOrderDraft } from "../model"
import type { OrderDTO, OrderInsertDTO } from "../api/dto"
import { normalizeOrderDraft } from "../lib"

export const mapOrderDraftToInsert = (order: IOrderDraft): OrderInsertDTO => {
  const normalizedDraft = normalizeOrderDraft(order)

  return {
    user_id: normalizedDraft.userId,
    flat: normalizedDraft.flat,
    floor: normalizedDraft.floor,
    payer_name: normalizedDraft.payerName,
    dont_ring_intercom: normalizedDraft.dontRingIntercom,
    delivery_address: normalizedDraft.deliveryAddress,
    delivery_type: normalizedDraft.deliveryType,
    payer_number: normalizedDraft.payerNumber,
    payment_type: normalizedDraft.paymentType,
    order_comment: normalizedDraft.orderComment,
    delivery_time_from: normalizedDraft.deliveryTimeFrom,
    delivery_time_to: normalizedDraft.deliveryTimeTo,
    ready_by_from: normalizedDraft.readyByFrom,
    ready_by_to: normalizedDraft.readyByTo,
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
