import type { CartItemsDTO, CartItemsInsertDTO } from "@/entities/cart/api/dto"
import type { ICartItem } from "@/entities/cart/model/types"

export type CartItemsMap = Record<number, ICartItem>

export const mapCartItem = (cartItemDTO: CartItemsDTO): ICartItem => {
  return {
    productId: cartItemDTO?.product_id || 0,
    quantity: cartItemDTO.quantity || 0,
  }
}

export const mappedCartItems = (cartItems: CartItemsDTO[]): CartItemsMap => {
  if (!cartItems?.length) return {}

  return cartItems.reduce<CartItemsMap>((acc, item) => {
    if (item.product_id == null || item.quantity == null) return acc

    acc[item.product_id] = mapCartItem(item)

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
