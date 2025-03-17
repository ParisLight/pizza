<template>
  <el-radio-button
    class="radio-button"
    v-bind="$attrs"
  >
    {{ name }}
  </el-radio-button>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.el-radio-button.radio-button {
  &.is-active {
    :deep(.el-radio-button__inner) {
      background-color: var(--color-purple);
      border: 1px solid var(--color-purple);
      box-shadow: 0px 2px 8px 0px #0000008C;
    }
  }
  &:deep(.el-radio-button__inner) {
    border-radius: var(--radius-6);
    box-shadow: 0px 2px 8px 0px #0000008C;
    background-color: transparent;
    border: 1px solid var(--color-purple);
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    line-height: 14px;
  }
}
</style>