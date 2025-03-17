<template>
    <div class="send-order" @click="">
        <base-btn
          class="send-order__base-btn"
          color="var(--color-purple)"
        >
          <div class="send-order__content">
            <span class="send-order__name">Заказать</span>
            <div class="send-order__total-price">
              <span>888 ₽</span>
            </div>
          </div>
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { BaseBtn } from "@/shared/ui/base-btn";
import { useOrderModel } from "@/entities/order";

const orderModel = useOrderModel()
</script>

<style lang="scss" scoped>
.send-order {
  &__base-btn {
    &:deep(.el-button) {
      height: 47px;
      width: 100%;
      padding: 10px 15px;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }
  &__name {
    font-size: 16px;
    line-height: 22px;
    color: var(--color-white);
    font-variant: all-small-caps;
  }
  &__total-price {
    background-color: var(--color-purple-light);
    border-radius: var(--radius-6);
    padding: 2px 12px;
    span {
      font-size: 12px;
      font-weight: 800;
      line-height: 20px;
      font-variant: all-small-caps;
    }
  }
}
</style>