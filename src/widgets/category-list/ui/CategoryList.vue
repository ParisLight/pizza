<template>
  <div class="category-list">
    <div class="category-list__main">
      <swiper-container
        ref="swiperEl"
        class="swiper"
        slidesPerView="auto"
        freeMode="true"
        spaceBetween="16"
      >
        <swiper-slide
          class="swiper__slide"
          v-for="category in categoryModel.categories"
          :key="category.id"
        >
          <category-card
            :class="{'category-card--active': categoryModel.idActiveCategory === category.id}"
            :data="category"
            @click="onClickCategory(category.id)"
          />
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card as CategoryCard } from '@/entities/category'
import { useCategoryModel } from "@/entities/category/model";
import { useProductModel } from "@/entities/product";

const categoryModel = useCategoryModel()
const productModel = useProductModel()


const onClickCategory = (id: number) => {
  categoryModel.setActiveCategory(id)
  productModel.fetchProducts(id)
}
</script>

<style lang="scss" scoped>
.swiper {
  &__slide {
    width: 72px;
  }
}
.category-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16px;
  position: relative;
  &__main {
    width: 100%
  }
}
</style>