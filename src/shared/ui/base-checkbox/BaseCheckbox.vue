<template>
  <div class="base-checkbox">
    <el-checkbox
      class="checkbox"
      v-model="model"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
const model = defineModel()
</script>

<style lang="scss" scoped>
.base-checkbox {
  .checkbox {
    &:deep(.el-checkbox__inner) {
      width: 24px;
      height: 24px;
      background-color: var(--color-main);
      border: none;
      border-radius: var(--radius-6);
      box-shadow: 0px 2px 8px 0px #0000008C;
    }
    &:deep(.el-checkbox__inner) {
      &::after {
        width: 5px;
        height: 14px;
        left: 9px;
      }
    }
    &:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
      color: var(--color-white);
    }
  }
}
</style>