<template>
  <div class="page">
    <CartList />
    <CurrentOrder
      ref="currentOrderRef"
      :form="form"
      :time-slots="deliverySlots"
      :form-rules="formRules"
    />
    <CheckoutOrder :form="form" @submit="handleCheckout" />
  </div>
</template>

<script setup lang="ts">
import { CartList } from "@/widgets/cart-list"
import { CurrentOrder, type CurrentOrderExpose } from "@/widgets/current-order"
import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { CheckoutOrder } from "@/widgets/checkout"
import { useCheckout, useCurrentOrder } from "@/features/order"

const userModel = useUserModel()
const cartModel = useCartModel()

const currentOrderRef = ref<CurrentOrderExpose | undefined>()

const { submitOrder } = useCheckout()

const { form, deliverySlots, formRules } = useCurrentOrder()

if (!cartModel.cartId && userModel.user?.userId) {
  cartModel.fetchCart(userModel.user.userId)
}

const handleCheckout = async () => {
  if (!currentOrderRef.value) {
    return
  }
  try {
    const isValid = await currentOrderRef.value.validateForm()

    if (!isValid) return

    await submitOrder(form)
  } catch (error) {
    console.log({ error }, "error_get_")
    ElNotification({
      title: "Error",
      message: "This is an error message",
      type: "error",
    })
  }
}
</script>

<style lang="scss" scoped></style>
