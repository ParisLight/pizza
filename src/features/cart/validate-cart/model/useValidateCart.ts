import { useProductModel } from "@/entities/product"
import { useCartModel } from "@/entities/cart"

export const useValidateCart = () => {
  const productModel = useProductModel()
  const cartModel = useCartModel()

  const inactiveItems = computed(() => {
    return cartModel.items.filter((cartItem) => {
      const product = productModel.products?.[cartItem.productId]

      return product?.isActive === false
    })
  })

  const invalidItems = computed(() => {
    return cartModel.items.filter((cartItem) => {
      return !productModel.products?.[cartItem.productId]
    })
  })

  const hasInvalidItems = computed(() => !!invalidItems.value.length)

  const hasInactiveItems = computed(() => !!inactiveItems.value.length)

  const deleteNotExistsItems = async () => {
    if (!hasInvalidItems.value) return

    const ids = invalidItems.value.map((carItem) => carItem.productId)

    ids.forEach((productId) => {
      cartModel.removeCompletelyFromCart(productId)
    })

    await cartModel.syncCart()
  }

  return { hasInactiveItems, deleteNotExistsItems }
}
