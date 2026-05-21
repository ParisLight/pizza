import { useCartModel } from '@/entities/cart'
import { useUserModel } from '@/entities/user'
import { useOrderModel } from '@/entities/order'

export const useCheckout = () => {
  const carModel = useCartModel()
  const orderModel = useOrderModel()
  const userModel = useUserModel()

  const submit = async () => {

  }
}
