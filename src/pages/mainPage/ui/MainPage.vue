<template>
  <div class="main-page">
    <div class="main-page__content mt-16">
      <SearchProduct />

      <CategoryList />
      <ProductList />
      <ProductCardPopup :product="productModel.products[0]" />
    </div>
  </div>
</template>

<script setup>
import { CategoryList } from "@/widgets/category-list";
import { SearchProduct } from '@/features/product'
import { ProductList } from "@/widgets/product-list";
import ProductCardPopup from "@/widgets/product-card-popup/ui/ProductCardPopup.vue";
import {useProductModel} from "@/entities/product";

const productModel = useProductModel()

const name = ref('')
</script>

<style lang="scss" scoped>
.main-page {
  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }
}

</style>