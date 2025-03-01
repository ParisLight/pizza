<template>
  <el-row class="row" :gutter="16">
    <el-col
      :span="12"
      v-for="product in productModel.filteredProducts"
      :key="product.id"
    >
      <ProductCard :product="product">
        <template #action>
          <ChangeQuantity :product="product"/>
        </template>
      </ProductCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ProductCard } from "@/entities/product";
import { ChangeQuantity } from "@/features/cart";
import {useProductModel} from "@/entities/product";

const productModel = useProductModel()
</script>

<style scoped>
.row {
  row-gap: 16px;
}
</style>