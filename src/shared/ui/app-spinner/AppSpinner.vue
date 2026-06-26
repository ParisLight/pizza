<template>
  <base-spinner class="base-spinner--full-page" />
</template>

<script setup>
import { BaseSpinner } from "@/shared/ui/base-spinner"

defineProps({
  isFullPage: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.base-spinner {
  &--full-page {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    :deep(svg) {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
