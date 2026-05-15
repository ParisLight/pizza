import { useCartModel } from "@/entities/cart";

export const useCompletelyDeleteActions = () => {
  const cartModel = useCartModel()

  const completelyDelete = async (productId: number) => {
    cartModel.removeCompletelyFromCart(productId)
    await cartModel.syncCart()
  }

  return { completelyDelete }
}


