<template>
    <div class="base-textarea">
        <div class="base-textarea__title" v-if="title">
            <span>{{ title }}</span>
        </div>
        <textarea
          v-bind="$attrs"
          v-model="model"
        />
    </div>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  &__title {
    padding-bottom: 2px;
    padding-left: 8px;
    span {
      font-size: 12px;
      line-height: 14px;
      font-variant: all-small-caps;
      color: var(--color-white);
      opacity: 0.5;
    }
  }
  textarea {
    background-color: var(--color-main);
    outline: none;
    border: none;
    resize: none;
    border-radius: var(--radius-8);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.5490196078);
    color: var(--color-white);
    padding: 12px;
    &::placeholder {
      color: var(--color-secondary);
    }
  }
}
</style>