import type { CartItemsDTO, CartItemsInsertDTO } from "@/entities/cart/api/dto"
import type { ICartItem } from "@/entities/cart/model/types"

export type CartItemsMap = Record<number, ICartItem>

export const mappedCartItems = (cartItems: CartItemsDTO[]): CartItemsMap => {
  if (!cartItems?.length) return {}

  return cartItems.reduce<CartItemsMap>((acc, item) => {
    if (item.product_id == null || item.quantity == null) return acc

    const existing = acc[item.product_id]

    acc[item.product_id] = {
      productId: item.product_id,
      quantity: existing ? Math.max(existing.quantity, item.quantity) : item.quantity,
    }

    return acc
  }, {})
}

export const mapCartItemsToInsert = (
  cartId: number,
  cartItems: CartItemsMap,
): CartItemsInsertDTO[] => {
  const items = Object.values(cartItems)

  if (!items.length) return []

  return items.map((item) => ({
    cart_id: cartId,
    product_id: item.productId,
    quantity: item.quantity,
  }))
}
