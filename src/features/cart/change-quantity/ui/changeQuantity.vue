<template>
  <div class="change-quantity" :class="size">
    <template v-if="quantityInCart">
      <el-button
        class="button-icon"
        color="var(--color-purple)"
        @click="handleClickMinus"
      >
        <slot name="icon">
          <img v-if="size === 'big'" :src="IconBigMinus" alt="minus">
          <img v-else :src="IconMinus" alt="minus">
        </slot>
      </el-button>
      <div class="change-quantity__quantity">
        <span>{{ quantityInCart }}</span>
      </div>
    </template>
    <el-button
      class="button-icon"
      color="var(--color-purple)"
      @click="handleClickPlus"
    >
      <slot name="icon">
        <img v-if="size === 'big'" :src="IconBigPlus" alt="plus">
        <img v-else :src="IconPlus" alt="plus">
      </slot>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import IconPlus from "@/assets/images/plus-bold.svg";
import IconMinus from "@/assets/images/minus-bold.svg";
import IconBigPlus from "@/assets/images/plus-big-icon.svg";
import IconBigMinus from "@/assets/images/minus-big-icon.svg"

import type { IProduct } from "@/entities/product";
import { useCartModel } from "@/entities/cart";

const cartModel = useCartModel()

const props = defineProps<{
  product: IProduct,
  size?: string,
  customPlusHandler?: boolean,
  customMinusHandler?: boolean
}>()


const emit = defineEmits<{
  onClickMinus: [product: IProduct, quantity: number],
  onClickPlus: [product: IProduct, quantity: number]
}>()

const quantityInCart = computed<number>(() => {
  const cartItem = cartModel.items.find(item => item.product_id === props.product.id)
  return cartItem ? cartItem.quantity : 0
})

const handleClickMinus = async (): Promise<void> => {
  if(!props.customMinusHandler) {
    await cartModel.removeFromCart(props.product.id)
  } else {
    emit('onClickMinus', props.product, quantityInCart.value)
  }
}

const handleClickPlus = async (): Promise<void> => {
  if(!props.customPlusHandler) {
    await cartModel.addToCart(props.product.id)
  } else {
    emit('onClickPlus', props.product, quantityInCart.value)
  }
}

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
        font-size: 18px;
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
  box-shadow: 0px 2px 8px 0px #0000008C;
  border-radius: var(--radius-6);
  img {
    width: 10px;
    height: 10px;
  }
}
</style>