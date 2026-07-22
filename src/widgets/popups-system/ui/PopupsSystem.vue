<template>
  <div class="popups-wrapper">
    <transition-group name="fade-group">
      <base-popup
        v-for="popup in popupModel.popups"
        :key="popup.id"
        :class="popup.props?.classes"
        @close="popupModel.closePopup(popup.id)"
      >
        <component :is="POPUP_REGISTRY[popup.name]" v-bind="popup.props" />
      </base-popup>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { usePopupModel } from "../model"
import { POPUP_REGISTRY } from "../config/popupRegistry"
import { BasePopup } from "@/shared/ui/base-popup"

const popupModel = usePopupModel()
</script>

<style scoped></style>
