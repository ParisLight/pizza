import { ApiError, supabase } from "@/shared/api"
import { mappedProducts } from "../lib"
import type { IProduct } from "@/entities/product"
import type { ProductDTO } from "@/entities/product/api/dto"

export const fetchProducts = async (
  categoryId: number,
  page: number = 1,
  limit: number = 20,
  query?: string,
): Promise<IProduct[]> => {
  const from = (page - 1) * limit
  const to = from + limit - 1
  const trimmedQuery = query?.trim()

  const base = supabase.from("products").select("*").eq("categoryId", categoryId)

  const filtered = trimmedQuery ? base.ilike("name", `%${trimmedQuery}%`) : base

  const { data, error } = await filtered.range(from, to).order("id", { ascending: true })

  if (error) {
    throw new ApiError("Failed to fetch products", error.code, error)
  }

  if (!data) return []

  return mappedProducts(data as ProductDTO[])
}

export const fetchProductsByProductIds = async (productIds: number[]): Promise<IProduct[]> => {
  const { data, error } = await supabase.from("products").select("*").in("id", productIds)

  if (error) {
    throw new ApiError("Failed to fetch products by ids", error.code, error)
  }

  if (!data) return []

  return mappedProducts(data as ProductDTO[])
}
