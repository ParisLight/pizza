import type { CartItemsDTO } from "@/entities/cart/api/dto";
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
