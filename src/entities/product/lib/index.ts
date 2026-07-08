import type { IProduct } from "../model/types"
import type { ProductDTO } from "@/entities/product/api/dto"

export const mappedProducts = (products: ProductDTO[]): IProduct[] => {
  if (!products?.length) return []

  return products.map((product) => ({
    id: product.id,

    img: product.img ?? null,
    name: product.name ?? "",

    weight: product.weight ?? null,
    description: product.description ?? null,
    price: product.price ?? null,
    isActive: product.is_active ?? false,

    categoryId: product.categoryId ?? 0,

    nutrition: {
      proteins: product.proteins ?? 0,
      fats: product.fats ?? 0,
      carbs: product.carbs ?? 0,
      kcal: product.kcal ?? 0,
    },
  }))
}
