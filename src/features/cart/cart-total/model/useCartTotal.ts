import { useCartModel } from "@/entities/cart"
import { useProductModel } from "@/entities/product"

export const useCartTotal = () => {
  const cartModel = useCartModel()
  const productModel = useProductModel()

  const cartTotal = computed(() => {
    return cartModel.items.reduce((acc, curr) => {
      const productPrice = productModel.products?.[curr?.productId]?.price || 0

      return acc + productPrice * curr.quantity
    }, 0)
  })

  return { cartTotal }
}
