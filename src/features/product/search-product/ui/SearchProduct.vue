<template>
  <BaseInput
      :icon-search="true"
      v-model="productModel.searchQuery"
      placeholder="Выберите пиццу здесь"
  />
</template>

<script lang="ts" setup>
import { BaseInput } from "@/shared/ui/base-input";
import { useProductModel } from "@/entities/product";

const productModel = useProductModel()

</script>

<style lang="scss" scoped>

</style>