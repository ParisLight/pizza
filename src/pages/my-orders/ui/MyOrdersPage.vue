<template>
  <div class="page">
    <div class="page__header">
      <div class="page__title">
        <span>история заказов</span>
      </div>
    </div>
    <div class="orders-list mt-16">
      <template v-if="isSkeleton(orderModel.loadingStatus)">
        <order-card-skeleton v-for="item in 3" :key="item" />
      </template>
      <base-error-plug v-else-if="isError(orderModel.loadingStatus)">
        <template #action>
          <base-btn color="var(--color-purple)" @click="retryLoad">Повторить</base-btn>
        </template>
      </base-error-plug>
      <base-empty-plug
        v-else-if="isEmpty(orderModel.loadingStatus)"
        title="Заказов нет"
        description="Как только оформите первый — он появится в этой ленте."
      />
      <template v-else>
        <order-card v-for="order in orderModel.ordersList" :key="order.orderId" :order="order" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderCard, OrderCardSkeleton, useOrderModel } from "@/entities/order"
import { useUserModel } from "@/entities/user"
import { isEmpty, isError, isSkeleton } from "@/shared/lib"
import { BaseBtn } from "@/shared/ui/base-btn"
import { BaseEmptyPlug } from "@/shared/ui/base-empty-plug"
import { BaseErrorPlug } from "@/shared/ui/base-error-plug"

const orderModel = useOrderModel()
const userModel = useUserModel()

const retryLoad = async () => {
  if (userModel.user?.userId) {
    await orderModel.loadOrders(userModel.user.userId)
  }
}

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
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
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
