<template>
  <product-card-row
    class="cart-item__product-card"
    :class="{ 'cart-item--disabled': disabled }"
    :product="product"
    :category-name="categoryModel.categories[product.categoryId]?.name || ''"
    direction="row"
    @img-click="onImgClick"
  >
    <template #action>
      <slot name="action"></slot>
    </template>
  </product-card-row>
</template>

<script setup lang="ts">
import { type IProduct, ProductCardRow } from "@/entities/product"
import { useCategoryModel } from "@/entities/category"

const categoryModel = useCategoryModel()

const props = defineProps<{
  product: IProduct
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "img-click", product: IProduct): void
}>()

const onImgClick = (): void => {
  emit("img-click", props.product)
}
</script>

<style lang="scss" scoped>
.cart-item {
  &--disabled {
    :deep(.product__img),
    :deep(.product__info),
    :deep(.product__price),
    :deep(.change-quantity) {
      opacity: 0.5;
    }
  }
}
</style>
