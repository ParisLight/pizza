<template>
  <go-to-telegram v-if="!canUseApp" />
  <app-spinner v-else-if="isLoadingApp" />
  <div v-else-if="isErrorApp" class="app-error">
    <base-error-plug>
      <template #action>
        <base-btn color="var(--color-purple)" @click="initializeApp">Повторить</base-btn>
      </template>
    </base-error-plug>
  </div>
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
import { useFormState } from "@/features/order"
import { BaseErrorPlug } from "@/shared/ui/base-error-plug"
import { BaseBtn } from "@/shared/ui/base-btn"

const route = useRoute()

const PopupsSystem = defineAsyncComponent(() =>
  import("@/widgets/popups-system").then((m) => m.PopupsSystem),
)

const layout = computed(() => {
  return route.meta.layout || DefaultLayout
})

const isLoadingApp = ref(true)
const isErrorApp = ref(false)

const userModel = useUserModel()
const cartModel = useCartModel()
const categoryModel = useCategoryModel()
const productModel = useProductModel()
const formModel = useFormState()

const { isTelegram, initData } = initTelegram()
const canUseApp = isTelegram && !!initData

const initializeApp = async () => {
  if (!canUseApp) return

  isErrorApp.value = false
  isLoadingApp.value = true

  try {
    if (!initData) throw new Error("Telegram initData is missing")

    await userModel.authUser(initData)

    if (!userModel.user) return
    await supabase.auth.getSession()
    await cartModel.fetchCart(userModel.user.userId)

    await Promise.allSettled([
      categoryModel.fetchCategories(),
      productModel.fetchProductsByPage(categoryModel.idActiveCategory),
    ])

    formModel.prefillForm()
  } catch {
    notifyError("Не удалось загрузить приложение")
    isErrorApp.value = true
  } finally {
    isLoadingApp.value = false
  }
}

onBeforeMount(async () => {
  await initializeApp()
})
</script>

<style lang="scss" scoped>
.app-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}
</style>
