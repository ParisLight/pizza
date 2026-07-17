import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { notifyError } from "@/shared/lib"

export const useChangeQuantity = () => {
  const cartModel = useCartModel()
  const userModel = useUserModel()

  const add = async (productId: number | undefined) => {
    try {
      await cartModel.addToCart(productId, userModel.user?.userId)
    } catch {
      notifyError("Не удалось добавить позицию в корзину")
    }
  }

  const remove = async (productId: number | undefined) => {
    try {
      await cartModel.removeFromCart(productId, userModel.user?.userId)
    } catch {
      notifyError("Не удалось удалить позицию")
    }
  }

  return {
    add,
    remove,
  }
}
