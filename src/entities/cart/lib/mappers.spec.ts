import { expect, test } from "vitest"
import { mapCartItemsToInsert, mappedCartItems } from "./mappers"
import type { CartItemsDTO } from "../api/dto"
import type { ICartItem } from "../model"

test("map dto cart items to domain cart items map", () => {
  expect(mappedCartItems([])).toEqual({})

  const cartItemsDTO: CartItemsDTO[] = [
    {
      cart_id: 1,
      id: 1,
      product_id: 1,
      quantity: 1,
      updated_at: new Date().toISOString(),
    },
  ]

  expect(mappedCartItems(cartItemsDTO)).toEqual<Record<number, ICartItem>>({
    1: {
      productId: 1,
      quantity: 1,
    },
  })
})

test("dedupe duplicate product rows by max quantity", () => {
  const cartItemsDTO: CartItemsDTO[] = [
    {
      cart_id: 1,
      id: 1,
      product_id: 1,
      quantity: 1,
      updated_at: new Date().toISOString(),
    },
    {
      cart_id: 1,
      id: 2,
      product_id: 1,
      quantity: 3,
      updated_at: new Date().toISOString(),
    },
  ]

  expect(mappedCartItems(cartItemsDTO)).toEqual({
    1: { productId: 1, quantity: 3 },
  })
})

test("map domain cart items map to dto", () => {
  expect(mapCartItemsToInsert(1, {})).toEqual([])

  const cartItemsDomain: Record<number, ICartItem> = {
    1: { productId: 1, quantity: 1 },
    2: { productId: 2, quantity: 2 },
  }

  expect(mapCartItemsToInsert(1, cartItemsDomain)).toEqual([
    { cart_id: 1, product_id: 1, quantity: 1 },
    { cart_id: 1, product_id: 2, quantity: 2 },
  ])
})
