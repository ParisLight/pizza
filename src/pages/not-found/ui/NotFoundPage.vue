<template>
  <div class="page">
    <base-empty-plug
      title="Страница потерялась"
      description="Такого адреса у нас нет. Вернитесь в меню — там точно есть пицца."
    />
  </div>
</template>

<script setup lang="ts">
import { BaseEmptyPlug } from "@/shared/ui/base-empty-plug"
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
</style>
