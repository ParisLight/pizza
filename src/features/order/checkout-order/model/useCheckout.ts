import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { useProductModel } from "@/entities/product"
import { type IOrderItemInput, useOrderModel } from "@/entities/order"
import { mapFormToOrderDraft, useOrderForm } from "@/features/order"
import { useValidateCart } from "@/features/cart"
import { useNotifications } from "@/shared/lib"
import { ROUTES } from "@/shared/config"

export const useCheckout = () => {
  const cartModel = useCartModel()
  const orderModel = useOrderModel()
  const userModel = useUserModel()
  const productModel = useProductModel()
  const router = useRouter()

  const { notifyError, notifySuccess } = useNotifications()

  const isInProcess = ref(false)

  const { form, formRef, setFormRef, clearForm, deliverySlots, formRules } = useOrderForm()

  const { hasInactiveItems, deleteNotExistsItems } = useValidateCart()

  const checkoutOrder = async () => {
    const userId = userModel.user?.userId

    if (!userId || !cartModel.productIdsInCart.length || !formRef.value) return

    try {
      await cartModel.flushPersistCart(userId)
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
      const orderItems: IOrderItemInput[] = cartModel.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      await orderModel.sendOrder(order, orderItems)

      notifySuccess("Заказ успешно создан")

      await router.push(ROUTES.myOrders)
      await Promise.allSettled([orderModel.loadOrders(userId), cartModel.clearCart(userId)])
      clearForm()
    } catch {
      notifyError("Не удалось оформить заказ")
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
    isInProcess,
  }
}
