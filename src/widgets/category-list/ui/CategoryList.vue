<template>
  <div class="category-list">
    <div class="category-list__main">
      <swiper-container
        ref="swiperEl"
        class="swiper"
        slidesPerView="auto"
        freeMode="true"
        spaceBetween="16"
        loop="true"
      >
        <swiper-slide
          class="swiper__slide"
          v-for="category in categoryModel.categories"
          :key="category.id"
        >
          <category-card
            :data="category"
          />
        </swiper-slide>
      </swiper-container>
    </div>
    <div
      class="category-list__arrow swiper-button-next"
      @click.stop="nextSlide"
    >
      <img src="@/assets/images/arrow_next.svg" alt="next">
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card as CategoryCard } from '@/entities/category'
import { useCategoryModel } from "@/entities/category/model";

const categoryModel = useCategoryModel()

const swiperEl = ref(null)

const nextSlide = () => {
  swiperEl.value.swiper.slideNext()
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
    width: calc(100% - 20px)
  }
  &__arrow {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 54px;
    border-radius: 12px;
    background-color: var(--color-main);
    box-shadow: 0px 2px 8px 0px #0000008C;
  }
}
</style>