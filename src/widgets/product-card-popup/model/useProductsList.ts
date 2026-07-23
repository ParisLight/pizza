import { useProductModel } from "@/entities/product"

export const useProductsList = (openingIdProduct: number | undefined) => {
  const productModel = useProductModel()

  const productCategoryId = computed(
    () =>
      Object.values(productModel.products).find((product) => product.id === openingIdProduct)
        ?.categoryId,
  )

  const productIds = computed(() => {
    if (!productCategoryId.value) return []
    return productModel.categoryProducts[productCategoryId.value] ?? []
  })

  const startProductIndex = computed(() => {
    const index = productIds.value.findIndex((productId) => productId === openingIdProduct)

    return index < 0 ? 0 : index
  })

  return { productIds, startProductIndex }
}
