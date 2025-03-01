<template>
  <el-input class="input" size="large" v-model="model" placeholder="Выберите пиццу здесь">
    <template #suffix>
      <img :src="SearchIcon" alt="search">
    </template>
  </el-input>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/images/search-icon.svg";

const props = defineProps({
  iconSearch: {
    type: Boolean,
    required: false,
    default: true
  }
})

const model = defineModel()
</script>

<style lang="scss" scoped>
.input {
  :deep(.el-input__wrapper) {
    background-color: var(--color-main);
    border-radius: 12px;
    box-shadow: 0px 4px 20px 0px #0000008C;
  }
  :deep(input) {
    color: white;
    &::placeholder {
      color: var(--color-golden);
    }
  }
}
</style>