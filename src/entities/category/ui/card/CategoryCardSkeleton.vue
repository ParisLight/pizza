<template>
  <el-skeleton animated class="category-card">
    <template #template>
      <div class="category-card__image">
        <el-skeleton-item variant="image" class="category-card__image-item" />
      </div>

      <el-skeleton-item variant="text" class="category-card__name" />
    </template>
  </el-skeleton>
</template>

<style scoped lang="scss">
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 54px;
  background-color: var(--color-main);
  box-shadow: 0 2px 8px 0 #0000008c;
  border-radius: 12px;

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image-item {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  &__name {
    width: 40px;
    height: 10px;
    margin-top: 4px;
  }
}
</style>
