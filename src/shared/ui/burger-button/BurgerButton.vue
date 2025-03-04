<template>
  <div
    class="burger-button"
    :class="{'burger-button--active': model}"
    @click="onClick"
  >
    <div class="burger-button__line"></div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({
  type: Boolean,
  default: false
})

const emit = defineEmits<{
  (e: 'onClick', state: model)
}>()

const onClick = (): void => {
  model.value = !model.value
  emit('onClick')
}
</script>

<style lang="scss" scoped>
.burger-button {
  width: 13px;
  height: 12px;
  cursor: pointer;
  position: relative;
  &__line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: var(--color-golden);
    top: 50%;
    transform: translateY(-50%);
    border-radius: 8px;
    overflow: hidden;
    transition: .2s ease-in-out;
  }
  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: var(--color-golden);
    border-radius: 8px;
    overflow: hidden;
    transition: .2s ease-in-out;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
  &--active {
    &::before {
      transform: rotate(45deg) translateY(-50%);
      top: 50%;
    }
    &::after {
      bottom: 50%;
      transform: rotate(-45deg) translateY(50%);
    }
    .burger-button__line {
      opacity: 0;
    }
  }
}
</style>