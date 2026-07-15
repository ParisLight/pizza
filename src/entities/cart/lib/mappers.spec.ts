import { expect, test } from "vitest"
import { mapCartItemsToInsert, mappedCartItems } from "./mappers"
import type { CartItemsDTO } from "../api/dto"
import type { ICartItem } from "../model"

test("map dto cart items to domain cart items", () => {
  expect(mappedCartItems([])).toEqual([])

  const cartItemsDTO: CartItemsDTO[] = [
    {
      cart_id: 1,
      id: 1,
      product_id: 1,
      quantity: 1,
      updated_at: new Date().toISOString(),
    },
  ]

  expect(mappedCartItems(cartItemsDTO)).toEqual<ICartItem[]>([
    {
      productId: 1,
      quantity: 1,
    },
  ])
})

test("map domain cart items to dto", () => {
  expect(mapCartItemsToInsert(1, [])).toEqual([])

  const cartItemsDomain: ICartItem[] = [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 },
  ]

  expect(mapCartItemsToInsert(1, cartItemsDomain)).toEqual([
    { cart_id: 1, product_id: 1, quantity: 1 },
    { cart_id: 1, product_id: 2, quantity: 2 },
  ])
})
