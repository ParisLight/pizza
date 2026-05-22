import type { IOrder } from "@/entities/order"
import type { OrderFormValues } from "@/features/order"

export const mapFormToOrder = (
  form: OrderFormValues,
  userId: number
): IOrder => {
  return {
    id: null,
    createdAt: null,

    userId,

    payerName: form.payerName,
    payerNumber: form.payerNumber,

    deliveryType: form.deliveryType,
    paymentType: form.paymentType,

    deliveryAddress: form.deliveryAddress,

    flat: form.flat ? Number(form.flat) : null,
    floor: form.floor ? Number(form.floor) : null,

    deliveryTime: Number(form.deliveryTime),

    dontRingIntercom: form.dontRingIntercom,

    orderComment: form.orderComment,
  }
}
