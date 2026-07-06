import { useCartModel } from "@/entities/cart"
import { useProductModel } from "@/entities/product"
import { type CartItem } from "./types"
import { notifyError } from "@/shared/lib"

export const useCartList = () => {
  const cartModel = useCartModel()
  const productModel = useProductModel()

  const cartDetailedItems = computed<CartItem[]>(() => {
    return cartModel.items.flatMap((item) => {
      const product = productModel.products[item.productId]

      if (!product) {
        return []
      }

      return [
        {
          product,
          quantity: item.quantity,
        },
      ]
    })
  })

  const cartIsEmpty = computed(() => cartModel.items.length === 0)

  const loadError = ref(false)
  const isLoadingProducts = ref(false)

  const loadCartProducts = async () => {
    loadError.value = false
    isLoadingProducts.value = true

    try {
      const cartProductIds = cartModel.items.map((item) => item.productId)
      await productModel.ensureProductsByIds(cartProductIds)
    } catch {
      loadError.value = true
      notifyError("Не удалось загрузить товары")
    } finally {
      isLoadingProducts.value = false
    }
  }

  return { cartDetailedItems, loadError, cartIsEmpty, isLoadingProducts, loadCartProducts }
}
