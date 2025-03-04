<template>
  <div class="popup__swiper">
    <el-carousel
      ref="carousel"
      :cardScale="0.6"
      height="260px"
      :autoplay="false"
      :indicator-position="'none'"
      :initial-index="activeProductIndex"
      @change="handleCarouselChange"
    >
      <el-carousel-item v-for="item in productModel.products" :key="item.id">
        <img
          class="card__img"
          :src="item.img"
          :alt="activeProduct.name"
        />
      </el-carousel-item>
    </el-carousel>
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
    <ChangeQuantity :product="activeProduct" :size="'big'" />
  </div>
</template>

<script lang="ts" setup>
import { type IProduct, useProductModel } from '@/entities/product';
import { ChangeQuantity } from '@/features/cart';
import { NutritionBar } from '@/features/product';

const props = defineProps<{
  product: IProduct;
}>();

const productModel = useProductModel();
const carousel = ref(null);
const activeProductIndex = ref(0);

const initializeActiveProductIndex = () => {
  if (props.product) {
    activeProductIndex.value = productModel.products.findIndex(
      (product) => product.id === props.product.id
    );
  }
};

initializeActiveProductIndex();


const activeProduct = computed(() => productModel.products[activeProductIndex.value]);

const handleCarouselChange = (index: number) => {
  activeProductIndex.value = index;
};
</script>

<style lang="scss" scoped>
.popup {
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
.el-carousel__item {
  background-color: unset;
}
:deep(.el-carousel__mask) {
  background-color: unset;
}
</style>