import { expect, test } from "vitest"
import {
  mapOrderDraftToInsert,
  mapOrderItemsToOrderItemsDTO,
  mapOrderLineDTOToOrderLine,
  mappedOrder,
} from "./mappers"
import {
  DeliveryType,
  type IOrder,
  type IOrderDraft,
  type IOrderItemInput,
  type IOrderLineItem,
  PaymentType,
} from "../model/types"
import type {
  OrderInsertDTO,
  OrderItemsDTO,
  OrderLineDTO,
  OrderWithItemsDTO,
} from "../api/dto"

test("map order draft pickup to insert dto", () => {
  const readyByFrom = "2026-07-18T12:00:00.000Z"
  const readyByTo = "2026-07-18T13:00:00.000Z"

  const orderDraftPickup: IOrderDraft = {
    deliveryType: DeliveryType.PICKUP,
    flat: null,
    floor: null,
    orderComment: "comment",
    userId: 1,
    payerName: "qwe",
    payerNumber: "89532831412",
    dontRingIntercom: null,
    paymentType: PaymentType.CARD,
    readyByTo,
    readyByFrom,
    deliveryAddress: null,
    deliveryTimeTo: null,
    deliveryTimeFrom: null,
  }

  expect(mapOrderDraftToInsert(orderDraftPickup)).toEqual<OrderInsertDTO>({
    delivery_type: DeliveryType.PICKUP,
    flat: null,
    floor: null,
    order_comment: "comment",
    user_id: 1,
    payer_name: "qwe",
    payer_number: "89532831412",
    dont_ring_intercom: null,
    payment_type: PaymentType.CARD,
    ready_by_to: readyByTo,
    ready_by_from: readyByFrom,
    delivery_address: null,
    delivery_time_to: null,
    delivery_time_from: null,
  })
})

test("map order draft delivery to insert dto", () => {
  const deliveryTimeFrom = "2026-07-18T12:00:00.000Z"
  const deliveryTimeTo = "2026-07-18T13:00:00.000Z"

  const orderDraftPickup: IOrderDraft = {
    orderComment: "comment",
    flat: 1,
    floor: 1,
    userId: 1,
    payerName: "qwe",
    payerNumber: "89532831412",
    dontRingIntercom: true,
    paymentType: PaymentType.CARD,
    readyByTo: null,
    readyByFrom: null,
    deliveryType: DeliveryType.DELIVERY,
    deliveryAddress: "pushkina str, h.1",
    deliveryTimeTo,
    deliveryTimeFrom,
  }

  expect(mapOrderDraftToInsert(orderDraftPickup)).toEqual<OrderInsertDTO>({
    order_comment: "comment",
    flat: 1,
    floor: 1,
    user_id: 1,
    payer_name: "qwe",
    payer_number: "89532831412",
    dont_ring_intercom: true,
    payment_type: PaymentType.CARD,
    ready_by_to: null,
    ready_by_from: null,
    delivery_type: DeliveryType.DELIVERY,
    delivery_address: "pushkina str, h.1",
    delivery_time_to: deliveryTimeTo,
    delivery_time_from: deliveryTimeFrom,
  })
})

test("map order items to dto", () => {
  expect(mapOrderItemsToOrderItemsDTO(undefined)).toEqual([])

  const orderItems: IOrderItemInput[] = [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 },
    { productId: 3, quantity: 3 },
  ]

  expect(mapOrderItemsToOrderItemsDTO(orderItems)).toEqual<OrderItemsDTO[]>([
    { product_id: 1, quantity: 1 },
    { product_id: 2, quantity: 2 },
    { product_id: 3, quantity: 3 },
  ])
})

test("map order line dto to domain", () => {
  const orderLineDTO: OrderLineDTO = {
    id: 1,
    order_id: 10,
    product_id: 5,
    created_at: "2026-07-18T00:00:00.000Z",
    base_price: 500,
    quantity: 2,
    discount_amount: 100,
    product_name: "Маргарита",
    total_price: 900,
  }

  expect(mapOrderLineDTOToOrderLine(orderLineDTO)).toEqual<IOrderLineItem>({
    orderId: 10,
    createdAt: "2026-07-18T00:00:00.000Z",
    basePrice: 500,
    quantity: 2,
    discountAmount: 100,
    productName: "Маргарита",
    totalPrice: 900,
  })
})

test("map nullable order line fields to defaults", () => {
  const orderLineDTO: OrderLineDTO = {
    id: 1,
    order_id: 10,
    product_id: 5,
    created_at: "2026-07-18T00:00:00.000Z",
    base_price: 500,
    quantity: 2,
    discount_amount: null,
    product_name: null,
    total_price: null,
  }

  expect(mapOrderLineDTOToOrderLine(orderLineDTO)).toEqual<IOrderLineItem>({
    orderId: 10,
    createdAt: "2026-07-18T00:00:00.000Z",
    basePrice: 500,
    quantity: 2,
    discountAmount: 0,
    productName: "",
    totalPrice: 0,
  })
})

test("map order with items dto to domain", () => {
  const orderDTO: OrderWithItemsDTO = {
    id: 10,
    user_id: 1,
    created_at: "2026-07-18T00:00:00.000Z",
    delivery_address: "pushkina str, h.1",
    delivery_type: DeliveryType.DELIVERY,
    delivery_time_from: "2026-07-18T12:00:00.000Z",
    delivery_time_to: "2026-07-18T13:00:00.000Z",
    discount_amount: null,
    dont_ring_intercom: true,
    flat: 1,
    floor: 2,
    order_comment: null,
    payer_name: null,
    payer_number: "89532831412",
    payment_type: PaymentType.CARD,
    ready_by_from: null,
    ready_by_to: null,
    subtotal_amount: 1000,
    total_amount: null,
    order_items: [
      {
        id: 1,
        order_id: 10,
        product_id: 5,
        created_at: "2026-07-18T00:00:00.000Z",
        base_price: 500,
        quantity: 2,
        discount_amount: null,
        product_name: null,
        total_price: null,
      },
    ],
  }

  expect(mappedOrder(orderDTO)).toEqual<IOrder>({
    orderId: 10,
    userId: 1,
    createdAt: "2026-07-18T00:00:00.000Z",
    deliveryAddress: "pushkina str, h.1",
    deliveryType: DeliveryType.DELIVERY,
    deliveryTimeFrom: "2026-07-18T12:00:00.000Z",
    deliveryTimeTo: "2026-07-18T13:00:00.000Z",
    discountAmount: 0,
    dontRingIntercom: true,
    flat: 1,
    floor: 2,
    orderComment: "",
    payerName: "",
    payerNumber: "89532831412",
    paymentType: PaymentType.CARD,
    readyByFrom: null,
    readyByTo: null,
    totalAmount: 0,
    orderItems: [
      {
        orderId: 10,
        createdAt: "2026-07-18T00:00:00.000Z",
        basePrice: 500,
        quantity: 2,
        discountAmount: 0,
        productName: "",
        totalPrice: 0,
      },
    ],
  })
})
