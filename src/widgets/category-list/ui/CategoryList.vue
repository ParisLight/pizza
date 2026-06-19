<template>
  <div class="category-list">
    <div class="category-list__main">
      <swiper ref="swiperEl" class="swiper" slidesPerView="auto" :freeMode="true" spaceBetween="16">
        <swiper-slide
          class="swiper__slide"
          v-for="category in categoryModel.categories"
          :key="category.id"
        >
          <category-card
            :class="{ 'category-card--active': categoryModel.idActiveCategory === category.id }"
            :data="category"
            @click="onClickCategory(category.id)"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card as CategoryCard, useCategoryModel } from "@/entities/category"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import { useProductModel } from "@/entities/product"

const categoryModel = useCategoryModel()
const productModel = useProductModel()

const onClickCategory = async (id: number) => {
  categoryModel.setActiveCategory(id)
  await productModel.fetchProductsByPage(id)
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
    width: 100%;
  }
}
</style>
