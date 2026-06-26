import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"

export const useChangeQuantity = () => {
  const cartModel = useCartModel()
  const userModel = useUserModel()

  const add = async (productId: number | undefined) => {
    await cartModel.addToCart(productId, userModel.user?.userId)
  }

  const remove = async (productId: number | undefined) => {
    await cartModel.removeFromCart(productId, userModel.user?.userId)
  }

  return {
    add,
    remove,
  }
}
