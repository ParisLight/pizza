import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { useProductModel } from "@/entities/product"
import { type IOrderItemInput, useOrderModel } from "@/entities/order"
import { mapFormToOrderDraft, type OrderFormValues } from "@/features/order"
import { useValidateCart } from "@/features/cart"
import { notifyError, notifySuccess } from "@/shared/lib"
import { ROUTES } from "@/shared/config"
import type { FormInstance } from "element-plus"

type Params = {
  form: OrderFormValues
  formRef: Ref<FormInstance | undefined>
  prefillForm: () => void
}

export const useCheckout = ({ form, formRef, prefillForm }: Params) => {
  const cartModel = useCartModel()
  const orderModel = useOrderModel()
  const userModel = useUserModel()
  const productModel = useProductModel()
  const router = useRouter()

  const isInProcess = ref(false)

  const { hasInactiveItems, deleteNotExistsItems } = useValidateCart()

  const checkoutOrder = async () => {
    const userId = userModel.user?.userId

    if (!userId || !cartModel.productIdsInCart.length || !formRef.value) return

    try {
      await cartModel.persistCart(userId)
    } catch {
      notifyError("Не удалось сохранить корзину")
      return
    }

    try {
      await productModel.ensureProductsByIds(cartModel.productIdsInCart)
      await deleteNotExistsItems()
    } catch {
      notifyError("Не удалось загрузить данные о товарах")
      return
    }

    if (hasInactiveItems.value) {
      notifyError("В корзине есть товары, снятые с продажи. Удалите их перед заказом")
      return
    }

    try {
      await formRef.value.validate()
    } catch {
      notifyError("Проверьте правильность заполненных полей")
      return
    }

    isInProcess.value = true

    try {
      const order = mapFormToOrderDraft(form, userId)
      const orderItems: IOrderItemInput[] = Object.values(cartModel.items).map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      await orderModel.sendOrder(order, orderItems)

      notifySuccess("Заказ успешно создан")

      await router.push(ROUTES.myOrders)
      await Promise.allSettled([orderModel.loadOrders(userId), cartModel.clearCart(userId)])
      prefillForm()
    } catch {
      notifyError("Не удалось оформить заказ")
    } finally {
      isInProcess.value = false
    }
  }

  return {
    checkoutOrder,
    isInProcess,
  }
}
