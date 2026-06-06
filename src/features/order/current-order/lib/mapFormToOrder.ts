import type { IOrder } from "@/entities/order"
import type { OrderFormValues } from "@/features/order"

export const mapFormToOrder = (
  form: OrderFormValues,
  userId: number
): IOrder => {
  return {
    createdAt: new Date().toISOString(),

    userId,

    payerName: form.payerName,
    payerNumber: form.payerNumber,

    deliveryType: form.deliveryType,
    paymentType: form.paymentType,

    deliveryAddress: form.deliveryAddress || null,

    flat: form.flat ? Number(form.flat) : null,
    floor: form.floor ? Number(form.floor) : null,

    readyByFrom: form.readyBy?.from ? String(form.readyBy.from) : null,
    readyByTo: form.readyBy?.to ? String(form.readyBy.to) : null,

    deliveryTimeFrom: form.deliveryTime?.from ? String(form.deliveryTime.from) : null,
    deliveryTimeTo: form.deliveryTime?.to ? String(form.deliveryTime.to) : null,

    dontRingIntercom: typeof form.dontRingIntercom !== 'boolean' ? null : form.dontRingIntercom,

    orderComment: form.orderComment,
  }
}
