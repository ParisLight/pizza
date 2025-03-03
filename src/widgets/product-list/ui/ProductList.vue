<template>
  <el-row class="row" :gutter="16">
    <el-col
      :span="12"
      v-for="product in filteredProducts"
      :key="product.id"
    >
      <ProductCard
        :product="product"
        @img-click="onImgClick(product)"
      >
        <template #action>
          <ChangeQuantity :product="product"/>
        </template>
      </ProductCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {type IProduct, ProductCard} from "@/entities/product";
import { ChangeQuantity } from "@/features/cart";
import { useProductModel } from "@/entities/product";
import { useCategoryModel } from "@/entities/category";
import { usePopupModel } from "@/features/popups";

const productModel = useProductModel()
const categoryModel = useCategoryModel()
const popupModel = usePopupModel()

const onImgClick = (product: IProduct) => {
  popupModel.openPopup('ProductCardPopup',
    {
      product
    })
}

// todo: fix_this
const filteredProducts = computed(() => {
  let products = !productModel.products.length ? [] : productModel.products.filter(product => product.categoryId === categoryModel.idActiveCategory)
  products = products.filter(product => product.name.toLowerCase().includes(productModel.searchQuery.toLowerCase()))

  return products
})
</script>

<style scoped>
.row {
  row-gap: 16px;
}
</style>