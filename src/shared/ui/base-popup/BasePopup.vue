<template>
  <div class="popup-wrapper">
    <div class="popup">
      <el-button
        class="popup__exit"
        color="var(--color-main)"
        @click="onClickExit"
      >
        <slot name="icon">
          <img :src="IconCross" alt="plus">
        </slot>
      </el-button>
      <div class="popup__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCross from '@/assets/images/cross-icon.svg';

const emit = defineEmits(['close'])

const onClickExit = () => {
  emit('close')
}

</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: fixed;
  z-index: 10;
  inset: 0;
  background-color: var(--popup-background);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  position: relative;
  background-color: var(--color-main);
  width: calc(100% - 40px);
  border-radius: 16px;
  padding-bottom: 16px;
  overflow: hidden;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__exit {
    position: absolute;
    z-index: 10;
    box-shadow: 0px 2px 8px 0px #0000008C;
    top: 0;
    right: 0;
    width: 42px;
    height: 42px;
  }
}
</style>