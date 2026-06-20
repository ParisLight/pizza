<template>
  <el-row class="row products-list" :gutter="16">
    <template v-if="isSkeleton(productModel.categoryStatus?.[categoryModel.idActiveCategory])">
      <el-col :span="12" v-for="n in 12" :key="n">
        <skeleton-product-card />
      </el-col>
    </template>
    <template v-else>
      <transition-group name="fade-group">
        <el-col
          :span="12"
          v-for="productId in productModel.categoryProducts?.[categoryModel.idActiveCategory] ?? []"
          :key="productId"
        >
          <product-card
            class="product-list__item"
            :product="productModel.products[productId]"
            @img-click="onImgClick(productId)"
          >
            <template #action>
              <change-quantity
                class="product-list__quantity"
                :product="productModel.products[productId]"
              />
            </template>
          </product-card>
        </el-col>
      </transition-group>
    </template>
    <div ref="sentinelRef" class="sentinel"></div>
  </el-row>
</template>

<script setup lang="ts">
import { ProductCard, SkeletonProductCard, useProductModel } from "@/entities/product"
import { ChangeQuantity } from "@/features/cart"
import { useCategoryModel } from "@/entities/category"
import { usePopupModel } from "@/features/popups"
import { useAsyncStatus, useInfinityScroll } from "@/shared/lib"

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
  await productModel.fetchProductsByPage(categoryModel.idActiveCategory)
})

const { isSkeleton } = useAsyncStatus()
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
