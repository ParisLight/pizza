import type { CartItemsDTO } from "@/entities/cart/api/dto"
import type { ICartItem } from "@/entities/cart/model/types"
import { ApiError, supabase } from "@/shared/api"
import { mapCartItemsToInsert, mappedCartItems } from "@/entities/cart/lib/mappers"

export const fetchCart = async (cartId: number): Promise<Record<number, ICartItem>> => {
  const { data, error } = await supabase.from("cart_items").select("*").eq("cart_id", cartId)

  if (error) {
    throw new ApiError("Failed to fetch cart items", error.code, error)
  }

  if (!data) return {}

  return mappedCartItems(data as CartItemsDTO[])
}

export const fetchCartIdByUser = async (userId: number) => {
  const { data, error } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle()
  if (error) {
    throw new ApiError("Failed to fetch user cart", error.code, error)
  }

  return data?.id ?? null
}

export const deletePositionsFromCart = async (
  cartId: number,
  productIds: number[],
): Promise<boolean | null> => {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId)
    .in("product_id", productIds)

  if (error) {
    throw new ApiError("Failed to delete product from cart", error.code, error)
  }

  if (!data) return null

  return true
}

export const clearCart = async (cartId: number): Promise<boolean> => {
  const { error } = await supabase.from("cart_items").delete().eq("cart_id", cartId)

  if (error) {
    throw new ApiError("Failed to delete product from cart", error.code, error)
  }

  return true
}

export const updateCart = async (
  cartId: number,
  items: Record<number, ICartItem>,
): Promise<Record<number, ICartItem>> => {
  if (!Object.keys(items).length) return {}

  const newCartItems = mapCartItemsToInsert(cartId, items)

  const { data, error: insertError } = await supabase
    .from("cart_items")
    .upsert(newCartItems, { onConflict: "cart_id,product_id" })
    .select("*")

  if (insertError) {
    throw new ApiError("Failed to update cart", insertError.code, insertError)
  }

  if (!data) return {}

  return mappedCartItems(data as CartItemsDTO[])
}
