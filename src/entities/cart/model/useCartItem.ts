import { useCartModel } from "./index"

export const useCartItem = (productId: MaybeRefOrGetter<number>) => {
  const cartModel = useCartModel()

  const id = computed(() => toValue(productId))

  const quantity = computed(() => cartModel.getProductQuantity(id.value))
  const isInCart = computed(() => cartModel.isProductInCart(id.value))
  return { quantity, isInCart }
}
