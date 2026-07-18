import { expect, test } from "vitest"
import { normalizeOrderDraft } from "./normalizeOrderDraft"
import { DeliveryType, type IOrderDraft, PaymentType } from "../model"

test("normalize delivery order draft", () => {
  const orderDraft: IOrderDraft = {
    userId: 1,
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.DELIVERY,
    deliveryAddress: "Pushkina str, h.1",
    flat: 10,
    floor: 3,
    paymentType: PaymentType.CARD,
    dontRingIntercom: true,
    deliveryTimeFrom: "2026-07-18T12:00:00.000Z",
    deliveryTimeTo: "2026-07-18T13:00:00.000Z",
    readyByFrom: "2026-07-18T10:00:00.000Z",
    readyByTo: "2026-07-18T11:00:00.000Z",
    orderComment: "Call before delivery",
  }

  expect(normalizeOrderDraft(orderDraft)).toEqual<IOrderDraft>({
    ...orderDraft,
    readyByFrom: null,
    readyByTo: null,
  })
})

test("normalize pickup order draft", () => {
  const orderDraft: IOrderDraft = {
    userId: 1,
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.PICKUP,
    deliveryAddress: "Pushkina str, h.1",
    flat: 10,
    floor: 3,
    paymentType: PaymentType.CASH,
    dontRingIntercom: true,
    deliveryTimeFrom: "2026-07-18T12:00:00.000Z",
    deliveryTimeTo: "2026-07-18T13:00:00.000Z",
    readyByFrom: "2026-07-18T10:00:00.000Z",
    readyByTo: "2026-07-18T11:00:00.000Z",
    orderComment: "No onions",
  }

  expect(normalizeOrderDraft(orderDraft)).toEqual<IOrderDraft>({
    ...orderDraft,
    deliveryAddress: null,
    flat: null,
    floor: null,
    dontRingIntercom: null,
    deliveryTimeFrom: null,
    deliveryTimeTo: null,
  })
})
