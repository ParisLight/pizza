<template>
  <el-row class="row products-list" :gutter="16">
    <transition-group name="fade-group">
      <el-col
        :span="12"
        v-for="productId in productModel.categoryProducts[categoryModel.idActiveCategory]"
        :key="productId"
      >
        <ProductCard
          class="product-list__item"
          :product="productModel.products[productId]"
          @img-click="onImgClick(productId)"
        >
          <template #action>
            <ChangeQuantity
              class="product-list__quantity"
              :product="productModel.products[productId]"
            />
          </template>
        </ProductCard>
      </el-col>
    </transition-group>
    <div ref="sentinelRef" class="sentinel"></div>
  </el-row>
</template>

<script setup lang="ts">
import { ProductCard, useProductModel } from "@/entities/product"
import { ChangeQuantity } from "@/features/cart"
import { useCategoryModel } from "@/entities/category"
import { usePopupModel } from "@/features/popups"
import { useInfinityScroll } from "@/shared/lib"

const productModel = useProductModel()
const categoryModel = useCategoryModel()
const popupModel = usePopupModel()

const onImgClick = (id: number) => {
  popupModel.openPopup("ProductCardPopup", {
    openingIdProduct: id,
  })
}

const sentinelRef = ref<HTMLElement | undefined>()

useInfinityScroll(sentinelRef, { root: null, rootMargin: "500px" }, async () => {
  const categoryId = categoryModel.idActiveCategory

  const meta = productModel.catalogMeta[categoryId]

  if (!meta?.hasMore || productModel.loadingCategories[categoryId]) return

  await productModel.fetchProductsByPage(categoryId)
})
</script>

<style lang="scss" scoped>
.sentinel {
  height: 1px;
  width: 100%;
}

.products-list {
  &__item {
    height: 100%;
  }

  &__quantity {
    margin-top: auto;
  }
}
.row {
  row-gap: 16px;
}
</style>
