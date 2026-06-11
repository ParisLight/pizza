<template>
  <div class="page">
    <div class="page__header">
      <div class="page__title">
        <span>история заказов</span>
      </div>
    </div>
    <div class="orders-list mt-16">
      <order-card v-for="order in orderModel.ordersList" :key="order.orderId" :order="order" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderCard, useOrderModel } from "@/entities/order"
import { useUserModel } from "@/entities/user"

const orderModel = useOrderModel()
const userModel = useUserModel()

onMounted(async () => {
  if (orderModel.ordersList.length === 0 && userModel.user?.userId) {
    await orderModel.loadOrders(userModel.user?.userId)
  }
})
</script>

<style lang="scss" scoped>
.page {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28px;
  }
  &__title {
    span {
      font-size: 24px;
      font-weight: 700;
      line-height: 14px;
      color: var(--color-golden);
      font-variant: all-small-caps;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 36px;
  }
  &__base-btn {
    margin-top: auto;
  }
}

.orders-list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
