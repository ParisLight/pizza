<template>
  <div class="base-empty-plug">
    <div class="base-empty-plug__visual" aria-hidden="true">
      <img class="base-empty-plug__pizza" src="@/assets/images/pizza.png" alt="" />
    </div>

    <div class="base-empty-plug__content">
      <p class="base-empty-plug__title">{{ title }}</p>
      <p v-if="description" class="base-empty-plug__text">{{ description }}</p>
    </div>

    <div v-if="$slots.action" class="base-empty-plug__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: "Пока пусто",
    description: "Здесь ещё нечего показать — загляните чуть позже.",
  },
)
</script>

<style lang="scss" scoped>
.base-empty-plug {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  padding: 28px 16px;
  text-align: center;

  &__visual {
    display: grid;
    place-items: center;
    width: 120px;
    height: 120px;
  }

  &__pizza {
    width: 88px;
    height: 88px;
    object-fit: contain;
    opacity: 0.45;
    filter: grayscale(0.2);
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 280px;
  }

  &__title {
    margin: 0;
    font-size: var(--font-size-3xl);
    line-height: 1.1;
    font-weight: var(--font-weight-bold);
    font-variant: all-small-caps;
    color: var(--color-golden);
  }

  &__text {
    margin: 0;
    font-size: var(--font-size-md);
    line-height: 1.4;
    color: var(--opacity-white);
  }

  &__action {
    width: 100%;
    max-width: 220px;
  }
}
</style>
