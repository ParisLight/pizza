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
          <span>Пицца пепперони - 2шт,</span> <br />
          <span>Напиток моча осла - 1шт</span>
        </div>
      </div>
    </div>
    <div class="order-card__row">
      <div class="order-card__row-col">
        <div class="subtitle">
          <span class="opacity-text">Сумма</span>
        </div>
        <div class="order-card__row-value">
          <span class="golden-text bold">1199Р</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrder } from "@/entities/order"
import { useFormatter } from "@/shared/lib"

defineProps<{
  order: IOrder
}>()

const { localeDateFromISO } = useFormatter()
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
      font-size: 16px;
      line-height: 14px;
    }
  }
}

.golden-text {
  color: var(--color-golden);
}

.bold {
  font-weight: 700;
  font-size: 16px;
  line-height: 14px;
  font-variant: all-small-caps;
}
.opacity-text {
  color: var(--opacity-white);
}
</style>
