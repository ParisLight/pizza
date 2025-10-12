<template>
  <div class="page">
    <CartList />
    <CurrentOrder />
    <SendOrder />
  </div>
</template>

<script setup lang="ts">
import { CartList } from '@/widgets/cart-list'
import { CurrentOrder } from '@/widgets/current-order'
import { useCartModel } from "@/entities/cart";
import { useUserModel } from "@/entities/user";

import SendOrder from "@/features/order/send-order/ui/SendOrder.vue";
const userModel = useUserModel()
const cartModel = useCartModel()

if(!cartModel.cartId) {
  cartModel.fetchCart(userModel.user.user_id)
}
</script>

<style lang="scss" scoped>

</style>