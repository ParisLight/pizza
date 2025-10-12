import { supabase } from "@/shared/api";

export const fetchCart = async (cartId) => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('product_id, quantity')
      .eq('cart_id', cartId)

    if(error) return []

    return data
  } catch (error) {
    console.log(error, 'cart_items')
  }
}

export const fetchCartId = async (userId) => {
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

export const updateCart = async (cartId, items) => {
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