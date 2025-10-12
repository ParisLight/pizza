<template>
  <ProductCard
    class="cart-item__product-card"
    :product="product"
    :category-name="categoryModel.getCategoryById(product.categoryId)?.name || ''"
    direction="row"
    @img-click="onImgClick"
  >
    <template #action>
      <slot name="action"></slot>
    </template>
  </ProductCard>
</template>

<script setup lang="ts">
import ProductCard from "@/entities/product/ui/ProductCard.vue";
import { IProduct } from "@/entities/product";
import { useCategoryModel } from "@/entities/category";

const categoryModel = useCategoryModel()

const props = defineProps<{
  product: IProduct
}>()

const emit = defineEmits<{
  onImgClick: [product: IProduct]
}>()

const onImgClick = (): void => {
  emit('onImgClick', props.product)
}

</script>

<style lang="scss" scoped>
</style>