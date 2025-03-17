<template>
  <BaseSpinner
    v-if="isLoadingApp"
    :is-full-page="true"
  />
  <template v-else>
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
</template>

<script setup>
import { DefaultLayout } from '@/shared/ui/layouts'
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import { PopupsSystem } from "@/widgets/popups-system";
import { useUserModel } from "@/entities/user";
import { useCartModel } from "@/entities/cart";
import { BaseSpinner } from "@/shared/ui/base-spinner";

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})

const isLoadingApp = ref(true)


const userModel = useUserModel()
const cartModel = useCartModel()
const initializeApp = async () => {
  await userModel.fetchUser(10001)
  await cartModel.fetchCart(userModel.user.user_id)
  isLoadingApp.value = false
}

onBeforeMount(async () => {
  await initializeApp()
})
</script>

<style lang="scss" scoped>
</style>