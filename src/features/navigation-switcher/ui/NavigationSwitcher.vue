<template>
  <div class="navigation-switcher">
    <burger-button
      v-model="navigationModel.isOpenNavigation"
    />
    <transition name="fade">
      <menu-navigation
        class="navigation-switcher__menu-navigation"
        v-if="navigationModel.isOpenNavigation"
      />
    </transition>
  </div>
</template>

<script setup>
import { BurgerButton } from "@/shared/ui/burger-button";
import { MenuNavigation } from "@/shared/ui/menu-navigation";
import { useNavigationModel } from '@/features/navigation-switcher'

const navigationModel = useNavigationModel()
</script>

<style lang="scss" scoped>
.navigation-switcher {
  &__menu-navigation {
    position: fixed;
    top: calc(54px + 18px);
    left: 0;
    right: 0;
    z-index: 10;
  }
}
</style>