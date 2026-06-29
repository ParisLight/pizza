<template>
  <base-input
    :icon-search="true"
    v-model="productModel.searchQuery"
    placeholder="Выберите пиццу здесь"
    @update:model-value="debouncedSearchInCategory"
  />
</template>

<script lang="ts" setup>
import { BaseInput } from "@/shared/ui/base-input"
import { useSearchProducts } from "../model"
import { useProductModel } from "@/entities/product"

const productModel = useProductModel()
const { debouncedSearchInCategory } = useSearchProducts()
</script>

<style lang="scss" scoped></style>
