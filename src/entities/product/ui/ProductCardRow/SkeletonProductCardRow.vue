<template>
  <el-skeleton animated class="product">
    <template #template>
      <el-skeleton-item variant="image" class="product__img" />

      <div class="product__content">
        <div class="product__info">
          <el-skeleton-item v-if="showCategory" variant="text" class="product__category" />

          <el-skeleton-item variant="text" class="product__name" />
        </div>

        <div class="product__footer">
          <el-skeleton-item variant="text" class="product__price" />

          <el-skeleton-item variant="button" class="product__buttons" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    showCategory?: boolean
  }>(),
  {
    showCategory: false,
  },
)
</script>

<style scoped lang="scss">
.product {
  display: flex;
  gap: 16px;

  &__img {
    flex-shrink: 0;
    width: 124px;
    height: 124px;
    border-radius: 16px;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__info {
    margin-bottom: auto;
  }

  &__category {
    width: 60px;
    height: 12px;
    margin-bottom: 8px;
  }

  &__name {
    width: 80%;
    height: 18px;
    max-width: 180px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-top: 12px;
  }

  &__price {
    width: 70px;
    height: 24px;
  }

  &__buttons {
    width: 100px;
    height: 32px;
  }
}
</style>
