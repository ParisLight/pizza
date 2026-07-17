import { useProductModel } from "@/entities/product"
import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"

export const useValidateCart = () => {
  const productModel = useProductModel()
  const cartModel = useCartModel()
  const userModel = useUserModel()

  const inactiveItems = computed(() => {
    return Object.values(cartModel.items).filter((cartItem) => {
      const product = productModel.products?.[cartItem.productId]

      return product?.isActive === false
    })
  })

  const invalidItems = computed(() => {
    return Object.values(cartModel.items).filter((cartItem) => {
      return !productModel.products?.[cartItem.productId]
    })
  })

  const hasInvalidItems = computed(() => !!invalidItems.value.length)

  const hasInactiveItems = computed(() => !!inactiveItems.value.length)

  const deleteNotExistsItems = async () => {
    if (!hasInvalidItems.value) return

    const ids = invalidItems.value.map((cartItem) => cartItem.productId)

    await cartModel.removeCompletelyFromCart(ids, userModel.user?.userId)
  }

  return { hasInactiveItems, deleteNotExistsItems }
}
