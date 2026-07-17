import { useCartModel } from "@/entities/cart"
import { useProductModel } from "@/entities/product"

export const useCartTotal = () => {
  const cartModel = useCartModel()
  const productModel = useProductModel()

  const cartTotal = computed(() => {
    return Object.values(cartModel.items).reduce((acc, curr) => {
      const product = productModel.products?.[curr.productId]

      if (!product || product.isActive === false) return acc

      const productPrice = product.price || 0

      return acc + productPrice * curr.quantity
    }, 0)
  })

  return { cartTotal }
}
