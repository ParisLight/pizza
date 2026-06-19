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
    <base-btn
      v-if="cartModel.totalQuantityCart"
      class="checkout-order"
      color="var(--color-purple)"
      @click.stop="checkoutOrder"
    >
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
import { BaseBtn } from "@/shared/ui/base-btn"
import { useCartTotal } from "@/features/cart"
import { useProductModel } from "@/entities/product"

const cartModel = useCartModel()
const productModel = useProductModel()

const { cartTotal } = useCartTotal()

onMounted(async () => {
  const cartProductIds = cartModel.items.map((item) => item.productId)

  if (cartProductIds.length !== 0) {
    await productModel.ensureProductsByIds(cartProductIds)
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
