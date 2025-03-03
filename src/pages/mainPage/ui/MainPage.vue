<template>
  <div class="main-page">
    <div class="main-page__content mt-16">
      <SearchProduct />
      <CategoryList />
      <ProductList />
      <PopupsSystem />
    </div>
  </div>
</template>

<script setup>
import { SearchProduct } from '@/features/product'
import { CategoryList } from "@/widgets/category-list";
import { ProductList } from "@/widgets/product-list";
import { PopupsSystem } from "@/widgets/popups-system";

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