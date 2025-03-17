<template>
  <div class="base-input">
      <div class="base-input__title" v-if="title">
          <span>{{ title }}</span>
      </div>
      <el-input
          class="input"
          size="large"
          v-model="model"
          v-bind="$attrs"
      >
          <template #suffix v-if="iconSearch">
              <img :src="SearchIcon" alt="search">
          </template>
      </el-input>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/images/search-icon.svg";

defineProps({
  iconSearch: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const model = defineModel()
</script>

<style lang="scss" scoped>
.input {
  height: 38px;
  :deep(.el-input__wrapper) {
    background-color: var(--color-main);
    border-radius: var(--radius-8);
    box-shadow: 0px 4px 20px 0px #0000008C;
  }
  :deep(input) {
    color: white;
    &::placeholder {
      color: var(--color-secondary);
    }
  }
}
.base-input {
  &__title {
    padding-left: 8px;
    padding-bottom: 2px;
    span {
      font-size: 12px;
      line-height: 14px;
      font-variant: all-small-caps;
      color: var(--color-white);
      opacity: 0.5;
    }
  }
}
</style>