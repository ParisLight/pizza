<template>
  <div class="basket-button">
    <img src="@/shared/ui/assets/basket-icon.svg" alt="basket">
    <div class="basket-button__count" v-if="count > 0">
      <span>{{ count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProps } from "./type";
const props = withDefaults(defineProps<IProps>(), {
  count: 0
})
</script>

<style lang="scss" scoped>
.basket-button {
  max-width: 12px;
  height: 12px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  img {
    width: 100%;
    height: 100%;
  }
  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: var(--color-purple);
    position: absolute;
    top: -6px;
    left: 50%;
    span {
      font-size: 8px;
      line-height: 12px;
      color: var(--color-white);
    }
  }
}
</style>