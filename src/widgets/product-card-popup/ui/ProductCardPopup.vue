<template>
  <div class="popup-wrapper">
    <div class="popup">
      <div class="popup__swiper">
        <el-carousel
          ref="carousel"
          cardScale="0.6"
          height="260px"
          :autoplay="false"
          :indicator-position="'none'"
        >
          <el-carousel-item v-for="item in productModel.products" :key="item">
            <img style="width: 100%; height: 100%; object-fit: contain;" :src="item.img" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="card__description popup__container">
        <div class="card__name">
          <span>{{ activeProduct.name }}</span>
        </div>
        <div class="card__descr">
          <span>{{ activeProduct.description }}</span>
        </div>
      </div>
      <NutritionBar :nutrition="activeProduct.nutrition" />
      <div class="card__footer popup__container">
        <div class="card__price">
          <span>{{ activeProduct.price }} ₽</span>
        </div>
        <ChangeQuantity
          :product="activeProduct"
          :size="'big'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type IProduct, useProductModel} from "@/entities/product";
import { ChangeQuantity } from "@/features/cart";
import { NutritionBar } from "@/features/product";

const props = defineProps<{
  product: IProduct
}>()

const productModel = useProductModel()

const carousel = ref(null)
const activeProduct = computed(() => {
  if(!carousel.value) return productModel.products[0]
  return productModel.products[carousel.value.activeIndex]
})

</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: fixed;
  z-index: 10;
  inset: 0;
  background-color: var(--popup-background);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  background-color: var(--color-main);
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding-bottom: 16px;
  &__container {
    width: calc(100% - 32px);
  }
  &__swiper {
    width: 100%;
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
    span {
      font-size: 16px;
      line-height: 14px;
      font-weight: 200;
      color: var(--color-white);
    }
  }
  &__price {
    span {
      font-size: 32px;
      font-weight: 700;
      line-height: 48px;
      color: var(--color-golden);
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 57px;
  }
}
.el-carousel__item {
  background-color: unset;
}
:deep(.el-carousel__mask) {
  background-color: unset;
}

</style>