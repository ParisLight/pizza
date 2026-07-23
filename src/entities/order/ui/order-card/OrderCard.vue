<template>
  <div class="order-card">
    <div class="order-card__row">
      <div class="order-card__row-col">
        <div class="subtitle">
          <span class="opacity-text">Заказ №</span>
        </div>
        <div class="order-card__row-value">
          <span class="golden-text bold">{{ order.orderId }}</span>
        </div>
      </div>
      <div class="order-card__row-col">
        <div class="subtitle">
          <span class="opacity-text">Дата</span>
        </div>
        <div class="order-card__row-value">
          <span class="bold">{{ localeDateFromISO(order.createdAt) }}</span>
        </div>
      </div>
    </div>
    <div class="order-card__row">
      <div class="order-card__row-col">
        <div class="subtitle">
          <span class="opacity-text">Детали</span>
        </div>
        <div class="order-card__row-value">
          <span
            v-for="(position, index) in order.orderItems"
            :key="`${position.orderId}-${index}`"
            class="order-card__position"
          >
            {{ position.productName }} - {{ position.quantity }}шт <br />
          </span>
        </div>
      </div>
    </div>
    <div class="order-card__row">
      <div class="order-card__row-col">
        <div class="subtitle">
          <span class="opacity-text">Сумма</span>
        </div>
        <div class="order-card__row-value">
          <span class="golden-text bold">{{ order.totalAmount }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrder } from "@/entities/order"
import { localeDateFromISO } from "@/shared/lib"

defineProps<{
  order: IOrder
}>()
</script>

<style lang="scss" scoped>
.order-card {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-radius: 16px;
  background-color: var(--color-main);
  padding: 16px;
  box-shadow: 0 2px 8px 0 #0000008c;

  &__row {
    display: flex;
    align-items: center;
    column-gap: 24px;
  }

  &__row-col {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &__row-value {
    span {
      font-size: var(--font-size-lg);
      line-height: 14px;
    }
  }
}

.golden-text {
  color: var(--color-golden);
}

.bold {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  line-height: 14px;
  font-variant: all-small-caps;
}
.opacity-text {
  color: var(--opacity-white);
}
</style>
