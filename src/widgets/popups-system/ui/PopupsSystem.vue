<template>
  <div class="popups-wrapper" v-if="popupModel.popups.length">
    <transition-group name="fade-group">
      <BasePopup
        v-for="(popup, key) in popupModel.popups"
        :key="key"
        @close="popupModel.closePopup(popup.id)"
      >
        <component
          :is="popups[popup.name]"
          v-bind="popup.props"
        />
      </BasePopup>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { usePopupModel } from "@/features/popups";
import { BasePopup } from "@/shared/ui/base-popup";

const popupModel = usePopupModel()

const popups: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  ProductCardPopup: defineAsyncComponent(() =>
    import('@/widgets/product-card-popup')
      .then(module => module.ProductCardPopup)
  ),
};
</script>

<style scoped>
</style>