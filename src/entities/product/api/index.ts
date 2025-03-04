import { supabase } from "@/shared/api";
import { mappedProducts } from "@/entities/product";

export const fetchProducts = async (categoryId: number) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('categoryId', categoryId)

    if(error) return []

    return mappedProducts(data)

  } catch (error) {
    console.log(error, 'products_')
  }
}

export const fetchProductsByProductIds = async (productIds: number[]) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds)

    if(error) return []

    return mappedProducts(data)

  } catch (error) {
    console.log(error)
  }
}