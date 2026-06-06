<template>
  <div class="popup__swiper">
    <swiper
      class="popup__swiper-instance"
      :slidesPerView="1.4"
      :centeredSlides="true"
      spaceBetween="5"
      @swiper="swiperInstance.onSwiper"
      @slide-change="swiperInstance.onSlideChange"
    >
      <swiper-slide v-for="product in productsArray" :key="product.id" class="popup__swiper-slide">
        <img v-if="product.img" class="card__img" :src="product.img" :alt="activeProduct.name" />
      </swiper-slide>
    </swiper>
  </div>
  <div class="card__description popup__container">
    <div class="card__name" v-if="activeProduct.name">
      <span>{{ activeProduct.name }}</span>
    </div>
    <div class="card__descr line-clamp" v-if="activeProduct.description">
      <span>{{ activeProduct.description }}</span>
    </div>
  </div>
  <NutritionBar
    class="card__nutrition-info"
    v-if="activeProduct.nutrition"
    :nutrition="activeProduct.nutrition"
  />
  <div class="card__footer popup__container">
    <div v-if="activeProduct.price" class="card__price">
      <span>{{ activeProduct.price }} ₽</span>
    </div>
    <ChangeQuantity :product="activeProduct" size="big" />
  </div>
</template>

<script lang="ts" setup>
import "swiper/css"
import { ChangeQuantity } from "@/features/cart"
import { NutritionBar } from "@/features/product"
import { Swiper, SwiperSlide } from "swiper/vue"
import { useProductsList } from "../model/useProductsList"
import { useSwiper } from "../model/useSwiper"
import { type IProduct } from "@/entities/product"

const props = defineProps<{
  openingIdProduct?: number
  closeCallback?: (args: unknown[]) => void
}>()

const { productsArray, startProductIndex } = useProductsList(props.openingIdProduct)

const swiperInstance = useSwiper(startProductIndex.value)

const activeProduct = computed<IProduct>(() => {
  return productsArray.value[swiperInstance.activeIndex.value] ?? null
})
</script>

<style lang="scss" scoped>
.popup {
  &__container {
    width: calc(100% - 32px);
  }
  &__swiper {
    width: 100%;
  }
  &__swiper-slide {
  }
}
.card {
  &__description {
    text-align: center;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-top: 16px;
  }
  &__name {
    span {
      font-size: 24px;
      line-height: 14px;
      font-weight: 700;
      color: var(--color-golden);
    }
  }
  &__descr {
    height: 32px;
    span {
      font-size: 16px;
      line-height: 14px;
      font-weight: 200;
      color: var(--color-white);
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__price {
    span {
      font-size: 32px;
      font-weight: 700;
      line-height: 48px;
      color: var(--color-golden);
    }
  }
  &__nutrition-info {
    margin-top: 16px;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 57px;
  }
}
</style>
