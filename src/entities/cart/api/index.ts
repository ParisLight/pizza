import {supabase} from "@/shared/api";

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
    // Удаляем старые записи из корзины
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId); // Удаляем все записи для данной корзины

    if (deleteError) {
      throw deleteError;
    }

    const newCartItems = items.map(item => ({
      cart_id: cartId,
      product_id: item.product_id,
      quantity: item.quantity,
      updated_at: Date.now(), // Устанавливаем текущее время
    }));

    // Вставляем новые записи в корзину
    const { data, error: insertError } = await supabase
      .from('cart_items')
      .insert(newCartItems); // Вставляем новые элементы корзины

    if (insertError) {
      throw insertError; // Если есть ошибка, выбрасываем её
    }
    console.log(data, 'data_check_')
    return data; // Возвращаем обновленные данные
  } catch (error) {
    console.error('Ошибка при обновлении корзины:', error);
    return null;
  }
}