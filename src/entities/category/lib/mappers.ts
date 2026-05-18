import type { CategoryDTO } from "@/entities/category/api/dto";
import type { ICategory } from "@/entities/category";

export const mappedCategories = (categories: CategoryDTO[]): Record<number, ICategory> => {
  const result = {} as Record<number, ICategory>

  categories.forEach((category) => {
    result[category.id] = {
      ...category,
      id: category.id,
      name: !category.name ? '' : category.name
    }
  })

  return result
}
