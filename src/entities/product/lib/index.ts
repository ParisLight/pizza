import type { IProduct } from "@/entities/product";

export const mappedProducts = (products: IProduct[]) => {
  if(!products || !products.length) return []

  return products.map((product) => ({
    id: product.id,
    img: product.img,
    name: product.name,
    weight: product.weight,
    description: product.description,
    price: product.price,
    nutrition: {
      proteins: product.proteins,
      fats: product.fats,
      carbs: product.carbs,
      kcal: product.kcal,
    },
    categoryId: product.categoryId,
  }))
}