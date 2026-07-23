<template>
  <div class="product">
    <div class="product__img" @click="onClickImg">
      <img
        v-if="product.img"
        :src="product.img"
        :alt="product.name"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="product__content">
      <div class="product__info">
        <p v-if="categoryName" class="product__category">{{ categoryName }}</p>
        <h3 class="product__name">{{ product.name }}</h3>
      </div>

      <div class="product__footer">
        <span class="product__price">{{ product.price }} ₽</span>
        <div class="product__action">
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type IProduct } from "@/entities/product"

const emit = defineEmits(["img-click"])

defineProps<{
  product: IProduct
  categoryName?: string
}>()

const onClickImg = () => {
  emit("img-click")
}
</script>

<style lang="scss" scoped>
.product {
  --product-img-size: 100px;
  --product-padding: 12px;

  display: flex;
  background: var(--color-main);
  border-radius: 16px;

  flex-direction: row;
  gap: 16px;
  padding: 0;
  background: none;

  .product__img {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 124px;
    height: 124px;
    border-radius: 16px;
    background-color: var(--color-main);
    box-shadow: 0 4px 20px 0 #0000008c;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }

  .product__info {
    margin: unset;
  }

  .product__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .product__action {
    margin: unset;
    display: flex;
  }

  &__img {
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }

  &__category {
    font-size: var(--font-size-sm);
    line-height: var(--font-size-md);
    color: var(--color-white);
    opacity: 0.5;
    font-variant: all-small-caps;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__info {
    margin-bottom: auto;
  }

  &__name {
    font-size: var(--font-size-lg);
    line-height: 1.2;
    font-weight: var(--font-weight-bold);
    color: var(--color-golden);
    margin: 4px 0;
  }

  &__weight {
    font-size: var(--font-size-sm);
    line-height: 1;
    color: var(--color-white);
    opacity: 0.5;
    margin: 4px 0;
  }

  &__description {
    font-size: var(--font-size-sm);
    line-height: 1;
    color: var(--color-white);
    opacity: 0.5;
    margin: 8px 0;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  &__price {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    line-height: 1.5;
    color: var(--color-golden);
  }

  &__action {
    margin-left: auto;
  }
}
</style>
