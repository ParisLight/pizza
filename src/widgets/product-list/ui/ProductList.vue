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
          @img-click="onImgClick(product.id)"
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
import { type IProduct, ProductCard } from "@/entities/product";
import { ChangeQuantity } from "@/features/cart";
import { useProductModel } from "@/entities/product";
import { useCategoryModel } from "@/entities/category";
import { usePopupModel } from "@/features/popups";

const productModel = useProductModel()
const categoryModel = useCategoryModel()
const popupModel = usePopupModel()


const onImgClick = (id: number) => {
  popupModel.openPopup('ProductCardPopup',
    {
      openingIdProduct: id,
    })
}

const filteredProducts = computed<IProduct []>(() => {

  const productsArray = Array.from(productModel.products.values());

  let products = productsArray.filter((product: IProduct) =>
    product.categoryId === categoryModel.idActiveCategory
  );

  if (productModel.searchQuery) {
    products = products.filter((product: IProduct) => {
      return product.name.toLowerCase().includes(productModel.searchQuery.toLowerCase())
    });
  }

  return products;

})
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