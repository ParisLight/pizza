import type { CartItemsDTO } from "@/entities/cart/api/dto"
import type { ICartItem } from "@/entities/cart/model/types"
import { ApiError, supabase } from "@/shared/api"
import { mapCartItemsToInsert, mappedCartItems } from "@/entities/cart/lib/mappers"

export const fetchCart = async (cartId: number): Promise<ICartItem[]> => {
  const { data, error } = await supabase.from("cart_items").select("*").eq("cart_id", cartId)

  if (error) {
    throw new ApiError("Failed to fetch cart items", error.code, error)
  }

  if (!data) return []

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

export const createCart = async (userId: number): Promise<number> => {
  const { data, error } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select("id")
    .single()

  if (error) {
    throw new ApiError("Failed to create cart", error.code, error)
  }

  if (!data) {
    throw new ApiError("Failed to create cart: empty response")
  }

  return data.id
}

export const updateCart = async (cartId: number, items: ICartItem[]): Promise<ICartItem[]> => {
  const { error: deleteError } = await supabase.from("cart_items").delete().eq("cart_id", cartId)

  if (deleteError) {
    throw new ApiError("Failed to delete cart", deleteError.code, deleteError)
  }

  if (!items.length) return []

  const newCartItems = mapCartItemsToInsert(cartId, items)

  const { data, error: insertError } = await supabase
    .from("cart_items")
    .insert(newCartItems)
    .select("*")

  if (insertError) {
    throw new ApiError("Failed to update cart", insertError.code, insertError)
  }

  if (!data) return []

  return mappedCartItems(data as CartItemsDTO[])
}
