import { useProductModel } from "@/entities/product"
import { useCategoryModel } from "@/entities/category"
import { usePopupModel } from "@/features/popups"

export const useProductList = () => {
  const productModel = useProductModel()
  const categoryModel = useCategoryModel()
  const popupModel = usePopupModel()

  const loadingStatus = computed(() =>
    productModel.getCategoryStatus(categoryModel.idActiveCategory),
  )

  const activeCategoryId = computed(() => categoryModel.idActiveCategory)

  const activeProductIds = computed(() => {
    const ids = productModel.categoryProducts[activeCategoryId.value] ?? []

    return ids.filter((id) => {
      const product = productModel.products[id]
      return (
        product?.isActive &&
        product.name.toLowerCase().includes(productModel.searchQuery.toLowerCase().trim())
      )
    })
  })

  const onProductClick = (id: number) => {
    popupModel.openPopup("ProductCardPopup", {
      openingIdProduct: id,
    })
  }

  return { loadingStatus, activeCategoryId, activeProductIds, onProductClick }
}
