<template>
  <div class="category-card">
    <div class="category-card__image">
      <img :src="data.icon || '@/assets/images/search-icon.svg'" alt="category-img" />
    </div>
    <div class="category-card__name">
      <span>{{ data.name || "name" }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ICategory } from "@/entities/category"

defineProps<{
  data: ICategory
}>()
</script>

<style lang="scss" scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 54px;
  background-color: var(--color-main);
  box-shadow: 0px 2px 8px 0px #0000008c;
  border-radius: 12px;
  transition: 0.2s ease-in-out background-color;
  cursor: pointer;
  &--active {
    background-color: var(--color-purple);
    .category-card__name span {
      opacity: 1;
    }
  }
  &__image {
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: auto;
    }
  }
  &__name span {
    font-size: var(--font-size-sm);
    line-height: 18px;
    font-weight: var(--font-weight-bold);
    color: var(--color-white);
    opacity: 0.5;
    transition: 0.2s ease-in-out opacity;
  }
}
</style>
