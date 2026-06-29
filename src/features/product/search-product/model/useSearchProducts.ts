import { useProductModel } from "@/entities/product"
import { useCategoryModel } from "@/entities/category"
import { useDebounceFn } from "@vueuse/core"

export const useSearchProducts = () => {
  const productModel = useProductModel()
  const categoryModel = useCategoryModel()

  const searchInCategory = async () => {
    await productModel.searchInCategory(categoryModel.idActiveCategory)
  }

  const debouncedSearchInCategory = useDebounceFn(searchInCategory, 300)

  return { debouncedSearchInCategory }
}
