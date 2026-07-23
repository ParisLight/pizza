import { expect, test } from "vitest"
import { mapFormToOrderDraft } from "./mapFormToOrder"
import { DeliveryType, type IOrderDraft, PaymentType } from "@/entities/order"
import type { OrderFormValues } from "../model"

test("maps delivery form to order draft", () => {
  const deliveryFrom = new Date("2026-07-18T12:00:00.000Z")
  const deliveryTo = new Date("2026-07-18T13:00:00.000Z")
  const readyFrom = new Date("2026-07-18T10:00:00.000Z")
  const readyTo = new Date("2026-07-18T11:00:00.000Z")

  const form: OrderFormValues = {
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    deliveryAddress: "  Pushkina str, h.1  ",
    dontRingIntercom: true,
    floor: "3",
    flat: "10",
    deliveryTime: { from: deliveryFrom, to: deliveryTo },
    readyBy: { from: readyFrom, to: readyTo },
    orderComment: "Call before delivery",
  }

  expect(mapFormToOrderDraft(form, 1)).toEqual<IOrderDraft>({
    userId: 1,
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    orderComment: "Call before delivery",
    deliveryAddress: "Pushkina str, h.1",
    flat: 10,
    floor: 3,
    dontRingIntercom: true,
    deliveryTimeFrom: "2026-07-18T12:00:00.000Z",
    deliveryTimeTo: "2026-07-18T13:00:00.000Z",
    readyByFrom: null,
    readyByTo: null,
  })
})

test("maps pickup form to order draft", () => {
  const deliveryFrom = new Date("2026-07-18T12:00:00.000Z")
  const deliveryTo = new Date("2026-07-18T13:00:00.000Z")
  const readyFrom = new Date("2026-07-18T10:00:00.000Z")
  const readyTo = new Date("2026-07-18T11:00:00.000Z")

  const form: OrderFormValues = {
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.PICKUP,
    paymentType: PaymentType.CASH,
    deliveryAddress: "Pushkina str, h.1",
    dontRingIntercom: true,
    floor: "3",
    flat: "10",
    deliveryTime: { from: deliveryFrom, to: deliveryTo },
    readyBy: { from: readyFrom, to: readyTo },
    orderComment: "No onions",
  }

  expect(mapFormToOrderDraft(form, 1)).toEqual<IOrderDraft>({
    userId: 1,
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.PICKUP,
    paymentType: PaymentType.CASH,
    orderComment: "No onions",
    deliveryAddress: null,
    flat: null,
    floor: null,
    dontRingIntercom: null,
    deliveryTimeFrom: null,
    deliveryTimeTo: null,
    readyByFrom: "2026-07-18T10:00:00.000Z",
    readyByTo: "2026-07-18T11:00:00.000Z",
  })
})

test("maps empty optional delivery fields to null", () => {
  const form: OrderFormValues = {
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    deliveryAddress: "   ",
    dontRingIntercom: false,
    floor: "",
    flat: "",
    deliveryTime: null,
    readyBy: null,
    orderComment: "",
  }

  expect(mapFormToOrderDraft(form, 1)).toEqual<IOrderDraft>({
    userId: 1,
    payerName: "Konstantin",
    payerNumber: "89532831412",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    orderComment: "",
    deliveryAddress: null,
    flat: null,
    floor: null,
    dontRingIntercom: false,
    deliveryTimeFrom: null,
    deliveryTimeTo: null,
    readyByFrom: null,
    readyByTo: null,
  })
})
