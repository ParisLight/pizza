<template>
  <go-to-telegram v-if="!canUseApp" />
  <app-spinner v-else-if="isLoadingApp" />
  <template v-else>
    <router-view v-slot="{ Component }">
      <component :is="layout">
        <template #header>
          <the-header />
        </template>
        <template #default>
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </template>
      </component>
    </router-view>
    <PopupsSystem />
  </template>
</template>

<script setup lang="ts">
import { DefaultLayout } from "@/shared/ui/layouts"
import { TheHeader } from "@/widgets/header"
import { useUserModel } from "@/entities/user"
import { useCartModel } from "@/entities/cart"
import { useProductModel } from "@/entities/product"
import { useCategoryModel } from "@/entities/category"
import { AppSpinner } from "@/shared/ui/app-spinner"
import { GoToTelegram } from "@/shared/ui/go-to-telegram"
import { initTelegram, notifyError } from "@/shared/lib"
import { supabase } from "@/shared/api"

const route = useRoute()

const PopupsSystem = defineAsyncComponent(() =>
  import("@/widgets/popups-system").then((m) => m.PopupsSystem),
)

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})

const isLoadingApp = ref(true)

const userModel = useUserModel()
const cartModel = useCartModel()
const categoryModel = useCategoryModel()
const productModel = useProductModel()

const { isTelegram, initData } = initTelegram()
const canUseApp = isTelegram && !!initData

const initializeApp = async () => {
  if (!canUseApp) {
    isLoadingApp.value = false
    return
  }

  try {
    await userModel.authUser(initData!)

    if (!userModel.user) return
    const { data } = await supabase.auth.getSession()
    await cartModel.fetchCart(userModel.user.userId)

    await Promise.allSettled([
      categoryModel.fetchCategories(),
      productModel.fetchProductsByPage(categoryModel.idActiveCategory),
    ])
  } catch {
    notifyError("Ошибка при загрузке")
  } finally {
    isLoadingApp.value = false
  }
}

onBeforeMount(async () => {
  await initializeApp()
})
</script>

<style lang="scss" scoped></style>
