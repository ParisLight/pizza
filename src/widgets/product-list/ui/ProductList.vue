<template>
  <el-row class="row" :gutter="16">
    <transition-group name="fade-group">
      <el-col
        :span="12"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <ProductCard
          class="product-list__item"
          :product="product"
          @img-click="onImgClick(product)"
        >
          <template #action>
            <ChangeQuantity
              class="product-list__quantity"
              :product="product"
            />
          </template>
        </ProductCard>
      </el-col>
    </transition-group>
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

const filteredProducts = computed(() => {
  let products = !productModel.products.length ? [] : productModel.products.filter(product => product.categoryId === categoryModel.idActiveCategory)
  products = products.filter(product => product.name.toLowerCase().includes(productModel.searchQuery.toLowerCase()))

  return products
})

productModel.fetchProducts(categoryModel.idActiveCategory)
</script>

<style scoped>
.product-list__item {
  height: 100%;
}
.product-list__quantity {
  margin-top: auto;
}
.row {
  row-gap: 16px;
}
</style>