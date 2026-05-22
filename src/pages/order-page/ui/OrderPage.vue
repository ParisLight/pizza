<template>
  <div class="page">
    <CartList />
    <CurrentOrder
      ref="currentOrderRef"
      :form="form"
      :delivery-slots="deliverySlots"
    />
    <CheckoutOrder
      :form="form"
      @submit="handleCheckout(); console.log('qweqewwqeqew')"
    />
  </div>
</template>

<script setup lang="ts">
import { CartList } from "@/widgets/cart-list"
import { CurrentOrder } from "@/widgets/current-order"
import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { CheckoutOrder } from "@/widgets/checkout"
import { useCurrentOrder, useCheckout } from "@/features/order";

const currentOrderRef = ref<InstanceType<typeof CurrentOrder>>()


const userModel = useUserModel()
const cartModel = useCartModel()

const { submitOrder } = useCheckout()

const { form, deliverySlots } = useCurrentOrder()

if (!cartModel.cartId && userModel.user?.userId) {
  cartModel.fetchCart(userModel.user.userId)
}

const handleCheckout = async () => {
  const isValid = await currentOrderRef.value?.validateForm()
  console.log(currentOrderRef.value, 'current_order_ref_')
  if (!isValid) return
  console.log(isValid, 'is_valid_get_')
  await submitOrder({
    form,
    validateForm: async () => true
  })
}
</script>

<style lang="scss" scoped></style>
