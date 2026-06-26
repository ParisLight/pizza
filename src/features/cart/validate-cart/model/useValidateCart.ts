import { useProductModel } from "@/entities/product"
import { useCartModel } from "@/entities/cart"

export const useValidateCart = () => {
  const productModel = useProductModel()
  const cartModel = useCartModel()

  const hasInvalidItems = computed(() => {
    return cartModel.items.some((cartItem) => {
      const product = productModel.products?.[cartItem.productId]

      if (!product) return false
      return !product.isActive
    })
  })

  const deleteNotExistsItems = async () => {
    const notExistsProducts = cartModel.items.filter(
      (cartItem) => !productModel.products?.[cartItem.productId],
    )

    if (!notExistsProducts.length) return

    const ids = notExistsProducts.map((carItem) => carItem.productId)

    ids.forEach((productId) => {
      cartModel.removeCompletelyFromCart(productId)
    })

    await cartModel.syncCart()
  }

  return { hasInvalidItems, deleteNotExistsItems }
}
