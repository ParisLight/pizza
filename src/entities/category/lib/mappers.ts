import type { CategoryDTO } from "@/entities/category/api/dto"
import type { ICategory } from "@/entities/category"

export const mappedCategories = (categories: CategoryDTO[]): Record<number, ICategory> => {
  return categories.reduce<Record<number, ICategory>>((acc, category) => {
    acc[category.id] = {
      ...category,
      id: category.id,
      name: !category.name ? "" : category.name,
    }

    return acc
  }, {})
}
