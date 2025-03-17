<template>
  <BaseInput
      @input="onInputHandler"
      :icon-search="true"
      placeholder="Выеберите пиццу здесь"
  />
</template>

<script lang="ts" setup>
import { BaseInput } from "@/shared/ui/base-input";
import { useProductModel } from "@/entities/product";

const productModel = useProductModel()

const onInputHandler = (query: string) => {
  productModel.setSearchQuery(query)
}
</script>

<style lang="scss" scoped>

</style>