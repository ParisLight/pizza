import type { CartItemsDTO } from "@/entities/cart/api/dto";
import type { ICartItem } from "@/entities/cart/model/types";
import { supabase } from "@/shared/api";
import { mappedCartItems, mapCartItemsToInsert } from "@/entities/cart/lib/mappers";

export const fetchCart = async (cartId: number): Promise<ICartItem[]> => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId)

  if(error || !data) return []

  return mappedCartItems(data as CartItemsDTO[])
}

export const fetchCartId = async (userId: number) => {
  const { data, error } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)

  if(error) return []

  return data
}

export const updateCart = async (cartId: number, items: ICartItem[]): Promise<ICartItem[]> => {
  const { error: deleteError } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId);


  const newCartItems = mapCartItemsToInsert(cartId, items)

  const { data, error: insertError } = await supabase
    .from('cart_items')
    .insert(newCartItems)
    .select('*')

  return mappedCartItems(data as CartItemsDTO[])
}
