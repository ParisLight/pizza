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
      <swiper-slide v-for="productId in productIds" :key="productId" class="popup__swiper-slide">
        <img
          v-if="productModel.products[productId]?.img"
          class="card__img"
          :src="productModel.products[productId]?.img ?? undefined"
          :alt="productModel.products[productId]?.name"
        />
      </swiper-slide>
    </swiper>
  </div>
  <div class="card__description popup__container">
    <div class="card__name" v-if="activeProduct?.name">
      <span>{{ activeProduct.name }}</span>
    </div>
    <div class="card__descr line-clamp" v-if="activeProduct?.description">
      <span>{{ activeProduct.description }}</span>
    </div>
  </div>
  <nutrition-bar
    class="card__nutrition-info"
    v-if="activeProduct"
    :nutrition="activeProduct.nutrition"
  />
  <div class="card__footer popup__container">
    <div v-if="activeProduct?.price" class="card__price">
      <span>{{ activeProduct.price }} ₽</span>
    </div>
    <change-quantity
      v-if="activeProduct"
      :product-id="activeProduct.id"
      size="big"
    />
  </div>
</template>

<script lang="ts" setup>
import "swiper/css"
import { ChangeQuantity } from "@/features/cart"
import { NutritionBar } from "@/features/product"
import { Swiper, SwiperSlide } from "swiper/vue"
import { useProductsList } from "../model/useProductsList"
import { useSwiper } from "../model/useSwiper"
import { type IProduct, useProductModel } from "@/entities/product"

const productModel = useProductModel()

const props = defineProps<{
  openingIdProduct?: number
}>()

const { productIds, startProductIndex } = useProductsList(props.openingIdProduct)

const swiperInstance = useSwiper(startProductIndex)

const activeProductId = computed<number | null>(() => {
  return productIds.value[swiperInstance.activeIndex.value] ?? null
})

const activeProduct = computed<IProduct | null>(() => {
  if (activeProductId.value == null) return null
  return productModel.products[activeProductId.value] ?? null
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
      font-size: var(--font-size-3xl);
      line-height: 14px;
      font-weight: var(--font-weight-bold);
      color: var(--color-golden);
    }
  }
  &__descr {
    height: 32px;
    span {
      font-size: var(--font-size-lg);
      line-height: 14px;
      font-weight: var(--font-weight-extralight);
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
      font-size: var(--font-size-5xl);
      font-weight: var(--font-weight-bold);
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
