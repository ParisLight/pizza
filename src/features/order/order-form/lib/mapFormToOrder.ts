import type { IOrder } from "@/entities/order"
import type { OrderFormValues } from "@/features/order"

export const mapFormToOrder = (form: OrderFormValues, userId: number): IOrder => {
  const getISODate = (str: Date) => {
    return new Date(str).toISOString()
  }

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

    readyByFrom: form.readyBy?.from ? getISODate(form.readyBy.from) : null,
    readyByTo: form.readyBy?.to ? getISODate(form.readyBy.to) : null,

    deliveryTimeFrom: form.deliveryTime?.from ? getISODate(form.deliveryTime.from) : null,
    deliveryTimeTo: form.deliveryTime?.to ? getISODate(form.deliveryTime.to) : null,

    dontRingIntercom: typeof form.dontRingIntercom !== "boolean" ? null : form.dontRingIntercom,

    orderComment: form.orderComment,
  }
}
