import { type IProduct, useProductModel } from "@/entities/product";

export const useProductsList = (openingIdProduct: number) => {
  const productModel = useProductModel();

  const productsArray = computed<IProduct[]>(() => {
    const productCategoryId = Object.values(productModel.products).find(product => product.id === openingIdProduct)?.categoryId

    if(!productCategoryId) return []

    return Object.values(productModel.products).filter((product: IProduct) => product.categoryId === productCategoryId)
  })

  const startProductIndex = computed(() => {
    const index = Object.values(productModel.products).findIndex(product => product.id === openingIdProduct)

    return index < 0 ? 0 : index
  })

  return { productsArray, startProductIndex }
}
