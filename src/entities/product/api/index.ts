import { supabase } from "@/shared/api";
import { mappedProducts } from "../lib"
import type { IProduct } from "@/entities/product";
import type { ProductDTO } from "@/entities/product/api/dto";

export const fetchAllProducts = async (): Promise<IProduct[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error || !data) return []

  return mappedProducts(data as ProductDTO[])
}

export const fetchProducts = async (categoryId: number): Promise<IProduct[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('categoryId', categoryId)

  if (error || !data) return []

  return mappedProducts(data as ProductDTO[])
}

export const fetchProductsByProductIds = async (productIds: number[]): Promise<IProduct[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)

  if(error || !data) return []

  return mappedProducts(data as ProductDTO[])
}
