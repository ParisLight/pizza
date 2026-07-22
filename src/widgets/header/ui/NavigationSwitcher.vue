<template>
  <div class="navigation-switcher">
    <burger-button v-model="isOpen" />
    <transition name="fade">
      <menu-navigation
        v-if="isOpen"
        class="navigation-switcher__menu-navigation"
        @navigate="isOpen = false"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { BurgerButton } from "@/shared/ui/burger-button"
import { MenuNavigation } from "@/shared/ui/menu-navigation"
import { useEventListener } from "@vueuse/core"

const isOpen = ref(false)

useEventListener("scroll", () => {
  isOpen.value = false
})
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
