import { useCartModel } from '@/entities/cart'
import { useUserModel } from '@/entities/user'
import { useOrderModel } from '@/entities/order'
import { type OrderFormValues, mapFormToOrder } from "@/features/order"

interface CheckoutParams {
  form: OrderFormValues
}

export const useCheckout = () => {
  const cartModel = useCartModel()
  const orderModel = useOrderModel()
  const userModel = useUserModel()

  const submitOrder = async ({ form }: CheckoutParams) => {
    const userId = userModel.user?.userId

    if (!userId) return

    if (!cartModel.items.length) return

    const order = mapFormToOrder(form, userId)

    const orderId = await orderModel.sendOrder(order)

    if (!orderId) {
      console.error("ERROR")
      return
    }

    cartModel.clearCart()
    await cartModel.syncCart()
  }

  return { submitOrder }
}
