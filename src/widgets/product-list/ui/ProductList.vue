<template>
  <div class="products-list">
    <template v-if="isSkeleton(loadingStatus)">
      <el-row class="row products-list__grid" :gutter="16">
        <el-col :span="12" v-for="n in FETCH_PRODUCTS_LIMIT" :key="n">
          <skeleton-product-card />
        </el-col>
      </el-row>
    </template>

    <el-empty
      v-else-if="isEmpty(loadingStatus)"
      class="products-list__empty"
      description="Пока тут пусто"
    />

    <transition v-else name="fade" mode="out-in">
      <el-row :key="activeCategoryId" class="row products-list__grid" :gutter="16">
        <el-col v-for="productId in activeProductIds" :key="productId" :span="12">
          <product-card
            class="products-list__item"
            :product="productModel.products[productId]"
            @img-click="onProductClick(productId)"
          >
            <template #action>
              <change-quantity
                class="product-list__quantity"
                :product-id="productModel.products[productId].id"
              />
            </template>
          </product-card>
        </el-col>
      </el-row>
    </transition>

    <div ref="sentinelRef" class="sentinel"></div>
    <base-spinner v-if="isLoadingMore(loadingStatus)" class="products-list__spinner" />
  </div>
</template>

<script setup lang="ts">
import {
  FETCH_PRODUCTS_LIMIT,
  ProductCard,
  SkeletonProductCard,
  useProductModel,
} from "@/entities/product"
import { ChangeQuantity } from "@/features/cart"
import {
  isLoadingMore,
  isPaginatedEmpty as isEmpty,
  isPaginatedSkeleton as isSkeleton,
  useInfinityScroll,
} from "@/shared/lib"
import { useProductList } from "@/widgets/product-list/model"
import { BaseSpinner } from "@/shared/ui/base-spinner"

const productModel = useProductModel()

const sentinelRef = ref<HTMLElement | undefined>()

const { loadingStatus, activeCategoryId, activeProductIds, onProductClick } = useProductList()

useInfinityScroll(sentinelRef, { root: null, rootMargin: "500px" }, async () => {
  await productModel.fetchProductsByPage(activeCategoryId.value)
})
</script>

<style lang="scss" scoped>
.products-list {
  width: 100%;

  &__grid {
    width: 100%;
  }

  &__empty {
    margin: 24px auto;
  }

  &__item {
    height: 100%;
  }

  &__quantity {
    margin-top: auto;
  }

  &__spinner {
    margin: 0 auto;
  }
}

.sentinel {
  height: 1px;
  width: 100%;
}

.row {
  row-gap: 16px;
}
</style>
