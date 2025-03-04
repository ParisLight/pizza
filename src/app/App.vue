<template>
  <component :is="layout">
    <template v-slot:header>
      <the-header />
    </template>
    <template v-slot:default>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </template>
  </component>
  <PopupsSystem />
</template>

<script setup>
import { DefaultLayout } from '@/shared/ui/layouts'
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import { PopupsSystem } from "@/widgets/popups-system";
const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})

</script>

<style lang="scss" scoped>

</style>