<template>
  <div class="product">
    <div class="product__img" @click="onClickImg">
        <img :src="product.img" :alt="product.name">
    </div>
    <div class="product__texts">
      <div class="product__name">
        <span>{{ product.name }}</span>
      </div>
      <div class="product__weight">
        <span>{{ product.weight }} гр</span>
      </div>
      <div class="product__description">
        <span>
          {{ product.description }}
        </span>
      </div>
    </div>
    <div class="product__footer">
      <div class="product__price">
        <span>{{ product.price }} ₽</span>
      </div>
      <div class="product__action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type IProduct } from "@/entities/product";

const emit = defineEmits(['imgClick'])

const onClickImg = () => {
    emit('imgClick')
}

defineProps<{
    product: IProduct
}>()
</script>

<style lang="scss" scoped>
.product {
  padding: 12px;
  background: var(--color-main);
  box-shadow: 0 4px 20px 0 #0000008C;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  &__img {
    width: 100px;
    height: 100px;
    text-align: center;
    align-self: center;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__texts {
    margin-top: 4px;
  }
  &__name {
    margin-top: 4px;
    span {
      color: var(--color-golden);
      font-size: 16px;
      line-height: 14px;
      font-weight: 700;
    }
  }
  &__weight {
    margin-top: 4px;
    span {
      color: var(--color-white);
      opacity: 0.5;
      font-size: 12px;
      line-height: 11px;
      font-weight: 700;
    }
  }
  &__description {
    margin-top: 8px;
    span {
      opacity: 0.5;
      color: var(--color-white);
      font-size: 12px;
      line-height: 11px;
      font-weight: 300;
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  &__price {
    span {
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      color: var(--color-golden);
    }
  }
}
</style>