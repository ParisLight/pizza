export interface INutrition {
  proteins: number
  fats: number
  carbs: number
  kcal: number
}

export interface IProduct {
  id: number
  img: string | null
  name: string
  weight: string | null
  description: string | null
  price: number | null
  nutrition: INutrition
  categoryId: number
  isActive: boolean
}

export type CatalogCategoryMeta = {
  page: number
  hasMore: boolean
}
