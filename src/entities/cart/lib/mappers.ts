import type { CartItemsDTO, CartItemsInsertDTO } from "@/entities/cart/api/dto";
import type { ICartItem } from "@/entities/cart/model/types";

export const mappedCartItems = (cartItems: CartItemsDTO[]): ICartItem[] => {
  if(!cartItems?.length) return []

  return cartItems
    .filter((item): item is CartItemsDTO & {
        product_id: number
        quantity: number
      } =>
        item.product_id != null && item.quantity != null
    )
    .map((item) => ({
      productId: item.product_id,
      quantity: item.quantity,
    }))
}

export const mapCartItemsToInsert = (cartId: number, cartItems: ICartItem[]): CartItemsInsertDTO[] => {
  if(!cartItems?.length) return []

  return cartItems.map((item) => ({
    cart_id: cartId,
    product_id: item.productId,
    quantity: item.quantity
  }))
}
