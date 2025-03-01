<template>
  <component :is="layout">
    <template v-slot:header>
      <the-header />
    </template>
    <template v-slot:default>
      <router-view />
    </template>
  </component>
</template>

<script setup>
import { DefaultLayout } from '@/shared/ui/layouts'
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})

</script>

<style lang="scss" scoped>

</style>