<template>
  <el-skeleton animated class="product" :class="`product--direction-${direction}`">
    <template #template>
      <el-skeleton-item class="product__img" variant="image" />
      <div class="product__content">
        <div class="product__info">
          <el-skeleton-item class="product__name" variant="text" />
          <template v-if="direction === 'default'">
            <el-skeleton-item class="product__weight" variant="text" />
            <el-skeleton-item class="product__description" variant="text" />
            <el-skeleton-item class="product__description" variant="text" />
          </template>
        </div>
        <div class="product__footer">
          <el-skeleton-item class="product__price" variant="text" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
type DirectionType = "default" | "row"

withDefaults(
  defineProps<{
    direction?: DirectionType
  }>(),
  {
    direction: "default",
  },
)
</script>

<style lang="scss" scoped>
.product {
  --product-img-size: 100px;
  --product-padding: 12px;

  display: flex;
  background: var(--color-main);
  box-shadow: 0 4px 20px 0 #0000008c;
  border-radius: 16px;
  min-height: 241px;

  &--direction-default {
    flex-direction: column;
    padding: var(--product-padding);

    .product__img {
      width: var(--product-img-size);
      height: var(--product-img-size);
      margin: 0 auto;
    }
  }

  &--direction-row {
    flex-direction: row;
    gap: 16px;
    padding: 0;
    background: none;
    box-shadow: none;

    .product__img {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 124px;
      height: 124px;
      border-radius: 16px;
      background-color: var(--color-main);
      box-shadow: 0 4px 20px 0 #0000008c;

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    }

    .product__info {
      margin: unset;
    }

    .product__footer {
      flex-direction: column;
      align-items: flex-start;
    }

    .product__action {
      margin: unset;
      display: flex;
    }
  }

  &__img {
    position: relative;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    &--clickable {
      cursor: pointer;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    margin-bottom: auto;
  }

  &__name {
    width: 70%;
    max-width: 120px;
  }

  &__weight {
    width: 30%;
    max-width: 50px;
  }

  &__description {
    width: 100%;
  }

  &__price {
    width: 60px;
  }
}
</style>
