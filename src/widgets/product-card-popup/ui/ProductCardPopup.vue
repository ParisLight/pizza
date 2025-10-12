<template>
  <div class="popup__swiper">
    <swiper
      class="popup__swiper-instance"
      @swiper="onSwiper"
      :slidesPerView="1.4"
      :centeredSlides="true"
      spaceBetween="5"
    >
      <swiper-slide
        class="popup__swiper-slide"
        v-for="product in productsArray"
        :key="product.id"
      >
        <img
          class="card__img"
          :src="product.img"
          :alt="activeProduct.name"
        />
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
    <div class="card__price" v-if="activeProduct.price">
      <span>{{ activeProduct.price }} ₽</span>
    </div>
    <ChangeQuantity
      :product="activeProduct"
      size="big"
    />
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css';
import { IProduct, useProductModel } from '@/entities/product';
import { useCategoryModel } from '@/entities/category'
import { ChangeQuantity } from '@/features/cart';
import { NutritionBar } from '@/features/product';
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from 'swiper/types/index'
import { onMounted } from "vue";

const props = defineProps<{
  openingIdProduct?: number;
  closeCallback?: (args: unknown[]) => any;
}>();

const productModel = useProductModel();
const categoryModel = useCategoryModel()
const swiperInstance = ref<SwiperType | null>(null)

const onSwiper = (swiper: SwiperType): void => {
  swiperInstance.value = swiper
}

const productsArray = computed<IProduct[]>(() => {
  const activeCategory = categoryModel.idActiveCategory

  return Array.from(productModel.products.values()).filter((product: IProduct) => product.categoryId === activeCategory)
})

const initializeStartSlide = () => {
  if(props.openingIdProduct && swiperInstance.value) {
    let index: number = 0

    const indexOpenedProduct = productsArray.value.findIndex(
      (product: IProduct) => product.id === props.openingIdProduct
    )

    if(indexOpenedProduct !== -1) {
      index = indexOpenedProduct
    }

    swiperInstance.value.slideTo(index)
  }
}

const activeProduct = computed<IProduct>(() => {
  if(swiperInstance.value?.activeIndex !== undefined && productsArray.value.length) {
    return productsArray.value[swiperInstance.value.activeIndex]
  }

  return productsArray.value[0] || {} as IProduct
})

onMounted(() => {
  initializeStartSlide()
});


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
    object-fit: contain
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