import { supabase } from "@/shared/api";
import {IProduct, mappedProducts} from "@/entities/product";

export const fetchAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if(error) return []

    return mappedProducts(data)

  } catch (error) {
    console.log(error, 'products_')
  }
}

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

export const fetchProductsByProductIds = async (productIds: number[]): Promise<IProduct[]> => {
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