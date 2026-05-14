import { supabase } from "@/shared/api";
import { mappedCartItems } from "@/entities/cart/lib/mappers";
import type { CartItemsDTO } from "@/entities/cart/api/dto";
import type { ICartItem } from "@/entities/cart/model/types";

export const fetchCart = async (cartId: number): Promise<ICartItem[]> => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('product_id, quantity')
    .eq('cart_id', cartId)

  if(error || !data) return []

  return mappedCartItems(data as CartItemsDTO[])
}

export const fetchCartId = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)

    if(error) return []

    return data
  } catch (error) {
    console.log(error, 'cart_id')
  }
}

export const updateCart = async (cartId: number, items: []) => {
  try {
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (deleteError) {
      throw deleteError;
    }

    const newCartItems = items.map(item => ({
      cart_id: cartId,
      product_id: item.product_id,
      quantity: item.quantity,
      updated_at: Date.now(),
    }));

    const { data, error: insertError } = await supabase
      .from('cart_items')
      .insert(newCartItems);

    if (insertError) {
      throw insertError;
    }
    return data;
  } catch (error) {
    console.error('Ошибка при обновлении корзины:', error);
    return null;
  }
}
