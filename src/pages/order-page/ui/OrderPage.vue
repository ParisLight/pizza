<template>
  <div class="page">
    <CartList />
    <CurrentOrder />
    <CheckoutOrder />
  </div>
</template>

<script setup lang="ts">
import { CartList } from "@/widgets/cart-list"
import { CurrentOrder } from "@/widgets/current-order"
import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { CheckoutOrder } from "@/features/order"

const userModel = useUserModel()
const cartModel = useCartModel()

if (!cartModel.cartId && userModel.user?.userId) {
  cartModel.fetchCart(userModel.user.userId)
}
</script>

<style lang="scss" scoped></style>
