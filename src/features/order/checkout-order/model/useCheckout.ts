import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { type IOrderItemInput, useOrderModel } from "@/entities/order"
import { mapFormToOrderDraft, useOrderForm } from "@/features/order"
import { useValidateCart } from "@/features/cart"
import { useProductModel } from "@/entities/product"

export const useCheckout = () => {
  const cartModel = useCartModel()
  const orderModel = useOrderModel()
  const userModel = useUserModel()
  const productModel = useProductModel()

  const isInProcess = ref(false)

  const { form, formRef, setFormRef, deliverySlots, formRules } = useOrderForm()

  const { hasInactiveItems, deleteNotExistsItems } = useValidateCart()

  const checkoutOrder = async () => {
    const userId = userModel.user?.userId

    if (!userId) return

    if (!cartModel.items.length) return

    if (!formRef.value) return

    await productModel.ensureProductsByIds(cartModel.productIdsInCart)

    await deleteNotExistsItems()

    if (hasInactiveItems.value) {
      ElNotification({
        title: "Ошибка",
        message:
          "В корзине присутствуют товары, которые уже сняты с продажи. Удалите их перед оформлением нового заказа",
        type: "error",
      })
      return
    }
    try {
      await formRef.value.validate()
    } catch {
      ElNotification({
        title: "Ошибка",
        message: "Проверьте правильность заполненных полей",
        type: "error",
      })

      return
    }

    isInProcess.value = true

    try {
      const order = mapFormToOrderDraft(form, userId)
      const orderItems: IOrderItemInput[] = cartModel.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      const orderId = await orderModel.sendOrder(order, orderItems)

      if (!orderId) {
        ElNotification({
          title: "Ошибка",
          message: "Что-то пошло не так",
          type: "error",
        })
        return
      }

      await Promise.allSettled([orderModel.loadOrders(userId), cartModel.clearCart(userId)])
    } catch {
      ElNotification({
        title: "Ошибка",
        message: "Что-то пошло не так",
        type: "error",
      })
    } finally {
      isInProcess.value = false
    }
  }

  return {
    checkoutOrder,
    form,
    deliverySlots,
    formRules,
    setFormRef,
  }
}
