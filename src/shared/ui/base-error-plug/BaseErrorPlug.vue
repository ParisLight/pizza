<template>
  <div class="base-error-plug">
    <div class="base-error-plug__visual" aria-hidden="true">
      <img class="base-error-plug__pizza" src="@/assets/images/pizza.png" alt="" />
      <span class="base-error-plug__glow" />
    </div>

    <div class="base-error-plug__content">
      <p class="base-error-plug__title">{{ title }}</p>
      <p class="base-error-plug__text">{{ description }}</p>
    </div>

    <div v-if="$slots.action" class="base-error-plug__action">
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
    title: "Не долетело",
    description: "Что-то пошло не так при загрузке. Обычно помогает ещё одна попытка.",
  },
)
</script>

<style lang="scss" scoped>
.base-error-plug {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  padding: 28px 16px;
  text-align: center;

  &__visual {
    position: relative;
    display: grid;
    place-items: center;
    width: 120px;
    height: 120px;
  }

  &__glow {
    position: absolute;
    inset: 12px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(248, 198, 37, 0.22) 0%, transparent 70%);
    animation: pulse-glow 2.4s ease-in-out infinite;
  }

  &__pizza {
    position: relative;
    z-index: 1;
    width: 96px;
    height: 96px;
    object-fit: contain;
    filter: grayscale(0.35) brightness(0.9);
    transform: rotate(-8deg);
    animation: float-tilt 3.2s ease-in-out infinite;
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

@keyframes float-tilt {
  0%,
  100% {
    transform: rotate(-8deg) translateY(0);
  }
  50% {
    transform: rotate(-2deg) translateY(-4px);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>
