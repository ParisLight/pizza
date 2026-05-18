<template>
  <ProductCard
    class="cart-item__product-card"
    :product="product"
    :category-name="categoryModel.categories[product.categoryId]?.name || ''"
    direction="row"
    @img-click="onImgClick"
  >
    <template #action>
      <slot name="action"></slot>
    </template>
  </ProductCard>
</template>

<script setup lang="ts">
import { IProduct, ProductCard } from "@/entities/product";
import { useCategoryModel } from "@/entities/category";

const categoryModel = useCategoryModel()

const props = defineProps<{
  product: IProduct
}>()

const emit = defineEmits<{
  (e: 'img-click', product: IProduct): void
}>()

const onImgClick = (): void => {
  emit('img-click', props.product)
}

</script>

<style lang="scss" scoped>
</style>
