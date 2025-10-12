<template>
  <div
    class="product"
    :class="`product--direction-${direction}`"
  >
    <div
      class="product__img"
      @click="onClickImg"
      :class="{ 'product__img--clickable': direction === 'default' }"
    >
      <img :src="product.img" :alt="product.name">
    </div>

    <div class="product__content">
      <div class="product__info">
        <p v-if="categoryName" class="product__category">{{ categoryName }}</p>
        <h3 class="product__name">{{ product.name }}</h3>
        <template v-if="direction === 'default'">
          <p class="product__weight">{{ product.weight }}</p>
          <p class="product__description line-clamp">
            {{ product.description }}
          </p>
        </template>
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
import {type IProduct} from "@/entities/product";

const emit = defineEmits(['img-click']);

type DirectionType = 'default' | 'row';

withDefaults(defineProps<{
  product: IProduct,
  direction?: DirectionType,
  categoryName?: string
}>(), {
  direction: 'default'
});

const onClickImg = () => {
  emit('img-click');
};
</script>

<style lang="scss" scoped>
.product {
  --product-img-size: 100px;
  --product-padding: 12px;

  display: flex;
  background: var(--color-main);
  box-shadow: 0 4px 20px 0 #0000008C;
  border-radius: 16px;
  position: relative;

  &--direction-default {
    flex-direction: column;
    padding: var(--product-padding);

    .product__img {
      width: var(--product-img-size);
      height: var(--product-img-size);
      margin: 0 auto;
    }
  }

  &--direction-row {
    flex-direction: row;
    gap: 16px;
    padding: 0;
    background: none;
    box-shadow: none;

    .product__img {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 124px;
      height: 124px;
      border-radius: 16px;
      background-color: var(--color-main);
      box-shadow: 0 4px 20px 0 #0000008C;

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
  }

  &__img {
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    &--clickable {
      cursor: pointer;
    }
  }

  &__category {
    font-size: 12px;
    line-height: 14px;
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
    font-size: 16px;
    line-height: 1.2;
    font-weight: 700;
    color: var(--color-golden);
    margin: 4px 0;
  }

  &__weight {
    font-size: 12px;
    line-height: 1;
    color: var(--color-white);
    opacity: 0.5;
    margin: 4px 0;
  }

  &__description {
    font-size: 12px;
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
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
    color: var(--color-golden);
  }

  &__action {
    margin-left: auto;
  }
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>