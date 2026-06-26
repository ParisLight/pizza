import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"

export const useCompletelyDeleteActions = () => {
  const cartModel = useCartModel()
  const userModel = useUserModel()

  const completelyDelete = async (productId: number) => {
    await cartModel.removeCompletelyFromCart(productId, userModel.user?.userId)
  }

  return { completelyDelete }
}
