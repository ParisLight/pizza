<template>
  <div class="change-quantity" :class="size">
    <template v-if="isInCart">
      <el-button
        class="button-icon"
        color="var(--color-purple)"
        :disabled="disabled"
        @click="remove(productId)"
      >
        <slot name="icon">
          <img v-if="size === 'big'" :src="IconBigMinus" alt="minus" />
          <img v-else :src="IconMinus" alt="minus" />
        </slot>
      </el-button>
      <div class="change-quantity__quantity">
        <span>{{ quantity }}</span>
      </div>
    </template>
    <el-button
      class="button-icon"
      color="var(--color-purple)"
      :disabled="disabled"
      @click="add(productId)"
    >
      <slot name="icon">
        <img v-if="size === 'big'" :src="IconBigPlus" alt="plus" />
        <img v-else :src="IconPlus" alt="plus" />
      </slot>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import IconPlus from "@/assets/images/plus-bold.svg"
import IconMinus from "@/assets/images/minus-bold.svg"
import IconBigPlus from "@/assets/images/plus-big-icon.svg"
import IconBigMinus from "@/assets/images/minus-big-icon.svg"

import { useChangeQuantity } from "../model/useChangeQuantity"
import { useCartItem } from "@/entities/cart"

const props = defineProps<{
  productId: number
  size?: "big" | "small"
  disabled?: boolean
}>()

const { productId } = toRefs(props)
const { quantity, isInCart } = useCartItem(productId)

const { add, remove } = useChangeQuantity()
</script>

<style lang="scss" scoped>
.change-quantity {
  display: flex;
  align-items: center;
  column-gap: 4px;
  &.big {
    .button-icon {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-8);
      img {
        width: 16px;
        height: 16px;
      }
    }
    .change-quantity__quantity {
      min-width: 20px;
      span {
        font-size: var(--font-size-xl);
        line-height: 26px;
        color: var(--color-white);
      }
    }
  }
  &__quantity {
    min-width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.button-icon {
  padding: 0;
  width: 24px;
  height: 24px;
  box-shadow: 0px 2px 8px 0px #0000008c;
  border-radius: var(--radius-6);
  img {
    width: 10px;
    height: 10px;
  }
}
</style>
