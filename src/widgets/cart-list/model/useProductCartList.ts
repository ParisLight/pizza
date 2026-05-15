import { useCartModel } from "@/entities/cart";
import { useProductModel, type IProduct } from "@/entities/product";

export const useProductCartList = () => {
  type CartItem = {
    product: IProduct,
    quantity: number
  }

  const cartModel = useCartModel()
  const productModel = useProductModel()

  const cartDetailedItems = computed<CartItem[]>(() => {
    return cartModel.items.flatMap(item => {
      const product =
        productModel.products[item.productId]

      if (!product) {
        return []
      }

      return [{
        product,
        quantity: item.quantity
      }]
    })
  })


  return { cartDetailedItems }
}
