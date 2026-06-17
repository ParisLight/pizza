import { type IOrderDraft, normalizeOrderDraft } from "@/entities/order"
import type { OrderFormValues } from "@/features/order"

export const mapFormToOrderDraft = (form: OrderFormValues, userId: number): IOrderDraft => {
  const toISO = (date: Date) => date.toISOString()

  const draft: IOrderDraft = {
    userId,
    payerName: form.payerName,
    payerNumber: form.payerNumber,
    deliveryType: form.deliveryType,
    paymentType: form.paymentType,
    orderComment: form.orderComment,

    deliveryAddress: form.deliveryAddress?.trim() || null,
    flat: form.flat ? Number(form.flat) : null,
    floor: form.floor ? Number(form.floor) : null,
    dontRingIntercom: form.dontRingIntercom ?? null,
    deliveryTimeFrom: form.deliveryTime?.from ? toISO(form.deliveryTime.from) : null,
    deliveryTimeTo: form.deliveryTime?.to ? toISO(form.deliveryTime.to) : null,
    readyByFrom: form.readyBy?.from ? toISO(form.readyBy.from) : null,
    readyByTo: form.readyBy?.to ? toISO(form.readyBy.to) : null,
  }

  return normalizeOrderDraft(draft)
}
