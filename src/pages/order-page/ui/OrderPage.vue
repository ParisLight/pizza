<template>
  <div class="page">
    <div class="page__header">
      <div class="page__title">
        <span>Ваш заказ</span>
      </div>
    </div>
    <cart-list />
    <order-form
      :form="form"
      :form-rules="formRules"
      :time-slots="deliverySlots"
      :set-form-ref="setFormRef"
    />
    <base-btn class="checkout-order" color="var(--color-purple)" @click.stop="checkoutOrder">
      <div class="checkout-order__content">
        <span class="checkout-order__name">Заказать</span>
        <div class="checkout-order__total-price">
          <span>{{ cartTotal }} ₽</span>
        </div>
      </div>
    </base-btn>
  </div>
</template>

<script setup lang="ts">
import { CartList } from "@/widgets/cart-list"
import { OrderForm, useCheckout } from "@/features/order"
import { useCartModel } from "@/entities/cart"
import { useUserModel } from "@/entities/user"
import { BaseBtn } from "@/shared/ui/base-btn"
import { useCartTotal } from "@/features/cart"

const userModel = useUserModel()
const cartModel = useCartModel()

const { cartTotal } = useCartTotal()

onMounted(async () => {
  if (!cartModel.cartId && userModel.user?.userId) {
    await cartModel.fetchCart(userModel.user.userId)
  }
})

const { form, formRules, setFormRef, deliverySlots, checkoutOrder } = useCheckout()
</script>

<style lang="scss" scoped>
.page {
  &__header {
    margin-top: 28px;
  }

  &__title span {
    font-variant: all-small-caps;
    font-size: 24px;
    font-weight: 700;
    line-height: 14px;
    color: var(--color-golden);
  }
}

.checkout-order {
  width: 100%;

  :deep(.el-button) {
    width: 100%;
    height: 47px;
    padding: 10px 15px;
    font-variant: all-small-caps;
  }
}
</style>
