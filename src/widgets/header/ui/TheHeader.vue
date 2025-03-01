<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <img src="@/assets/moon-logo.png" alt="logo">
      </div>
      <div class="header__actions">
        <basket-button />
        <navigation-switcher />
      </div>
    </div>
  </header>
</template>

<script setup>
import { BasketButton } from "@/shared/ui/basket-button";
import { NavigationSwitcher } from "@/features/navigation-switcher";
</script>

<style lang="scss" scoped>
.header {
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    justify-content: center;
  }
  &__logo {
    width: 64px;
    height: 54px;
    grid-column-start: 2;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    column-gap: 12px;
    margin-left: 72px;
    justify-self: flex-end;
  }
}
</style>