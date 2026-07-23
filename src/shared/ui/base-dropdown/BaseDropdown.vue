<template>
  <div class="base-dropdown">
    <div class="base-dropdown__title" v-if="title">
      <span>{{ title }}</span>
    </div>
    <el-dropdown
      v-bind="$attrs"
      trigger="click"
      popper-class="base-popper-dropdown"
      style="width: 100%"
      :teleported="false"
      @visible-change="onVisible"
      @command="onCommand"
    >
      <div class="dropdown" :class="{ 'dropdown--active': isVisible }">
        <span>
          {{ displayValue || "Выберите действие" }}
        </span>
        <div class="dropdown__arrow" :class="{ 'dropdown__arrow--active': isVisible }">
          <img src="@/assets/images/bottom-purple-arrow.svg" alt="arrow" />
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in list" :key="item.value" :command="item">
            <span>{{ item.label }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
interface DropdownItem {
  readonly label: string
  readonly value: string | number
}

const props = defineProps<{
  list: DropdownItem[]
  title?: string
}>()

const model = defineModel<DropdownItem | null>({
  required: true,
})

const isVisible = ref(false)

const onVisible = (event: boolean) => {
  isVisible.value = event
}

const onCommand = (item: DropdownItem) => {
  model.value = item
}

const selectedItem = computed(() => props.list.find((item) => item.value === model.value?.value))

const displayValue = computed(() => selectedItem.value?.label ?? "")
</script>

<style lang="scss" scoped>
.base-dropdown {
  &__title {
    padding-left: 8px;
    padding-bottom: 2px;

    span {
      font-weight: var(--font-weight-regular);
      font-size: var(--font-size-sm);
      line-height: var(--font-size-md);
      font-variant: all-small-caps;
      opacity: 0.5;
    }
  }
}

.dropdown {
  background-color: var(--color-main);
  padding: 12px;
  border-radius: var(--radius-8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  box-shadow: 0px 4px 20px 0px #0000008c;
  min-width: 182px;
  width: 100%;
  transition: 0.2s ease-in-out;

  &--active {
    border-radius: 8px 8px 0 0;
  }

  span {
    color: var(--color-white);
    font-size: var(--font-size-md);
    line-height: var(--font-size-md);
  }

  &__arrow {
    width: 16px;
    height: 9px;
    font-size: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: rotate(360deg);
      transition: 0.2s ease-in-out transform;
    }

    &--active {
      img {
        transform: rotate(180deg);
      }
    }
  }
}

:deep(.base-popper-dropdown) {
  left: 0 !important;
  top: calc(100%) !important;
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
  width: 100% !important;
  background: unset;
  border: none;
  border-radius: 0 0 8px 8px !important;

  .el-dropdown-menu {
    background-color: var(--color-main);
    border: none;
    border-radius: 0 0 8px 8px !important;
  }

  .el-popper__arrow {
    display: none;
  }

  .el-popper {
    box-shadow: none;
  }

  .el-dropdown-menu__item {
    &:hover,
    &:default {
      color: var(--color-golden) !important;
      background-color: var(--color-gray) !important;
    }

    &:default {
      background-color: unset;
    }
  }
}
</style>
