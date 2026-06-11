import { DeliveryType, type IOrderDraft } from "../model"

export const normalizeOrderDraft = (order: IOrderDraft): IOrderDraft => {
  const common = {
    userId: order.userId,
    payerName: order.payerName,
    payerNumber: order.payerNumber,
    deliveryType: order.deliveryType,
    paymentType: order.paymentType,
    orderComment: order.orderComment,
  }

  if (order.deliveryType === DeliveryType.DELIVERY) {
    return {
      ...common,
      deliveryAddress: order.deliveryAddress,
      flat: order.flat,
      floor: order.floor,
      dontRingIntercom: order.dontRingIntercom,
      deliveryTimeFrom: order.deliveryTimeFrom,
      deliveryTimeTo: order.deliveryTimeTo,
      readyByFrom: null,
      readyByTo: null,
    }
  }

  return {
    ...common,
    deliveryAddress: null,
    flat: null,
    floor: null,
    dontRingIntercom: null,
    deliveryTimeFrom: null,
    deliveryTimeTo: null,
    readyByFrom: order.readyByFrom,
    readyByTo: order.readyByTo,
  }
}
