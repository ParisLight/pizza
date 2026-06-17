import type { IOrder, IOrderDraft, IOrderItemInput, IOrderLineItem } from "../model"
import type { OrderInsertDTO, OrderItemsDTO, OrderLineDTO, OrderWithItemsDTO } from "../api/dto"
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

export const mapOrderItemsToOrderItemsDTO = (
  orderItems: IOrderItemInput[] | undefined,
): OrderItemsDTO[] => {
  if (!orderItems) return []

  return orderItems.map((item) => ({
    quantity: item.quantity,
    product_id: item.productId,
  }))
}

export const mapOrderLineDTOToOrderLine = (orderLine: OrderLineDTO): IOrderLineItem => {
  return {
    createdAt: orderLine.created_at,
    orderId: orderLine.order_id,
    basePrice: orderLine.base_price,
    quantity: orderLine.quantity,
    discountAmount: orderLine.discount_amount ?? 0,
    productName: orderLine.product_name ?? "",
    totalPrice: orderLine.total_price ?? 0,
  }
}

export const mappedOrder = (order: OrderWithItemsDTO): IOrder => {
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
    discountAmount: order.discount_amount || 0,
    totalAmount: order.total_amount || 0,
    orderItems: order.order_items.map((item) => mapOrderLineDTOToOrderLine(item)),
  }
}
