<template>
  <div class="base-empty-plug">
    <div class="base-empty-plug__text"><span>Пока тут пусто :(</span></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.base-empty-plug {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  &__text {
    span {
      font-size: var(--font-size-3xl);
      line-height: 14px;
      font-variant: all-small-caps;
      color: var(--color-golden);
    }
  }
}
</style>
