<template>
  <div class="base-dropdown">
    <div class="base-dropdown__title" v-if="title">
      <span>{{ title }}</span>
    </div>
    <el-dropdown
      v-bind="$attrs"
      trigger="click"
      popper-class="base-dropdown__list"
      :teleported="false"
      @visible-change="onVisible"
      style="width: 100%"
    >
      <div class="dropdown" :class="{ 'dropdown--active': isVisible }">
        <span>
          {{ displayValue || 'Выберите действие' }}
        </span>
        <div class="dropdown__arrow" :class="{ 'dropdown__arrow--active': isVisible }">
          <img src="@/assets/images/bottom-purple-arrow.svg" alt="arrow">
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in list"
            :key="'drop_element' + index"
            @click="itemClick(item)"
          >
            <span>{{ typeof item === 'object' ? item[nameItem] : item }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  list: {
    type: [Array, Object],
    required: true,
  },
  idItem: {
    type: String,
    required: false,
    default: 'id',
  },
  nameItem: {
    type: String,
    required: false,
    default: 'name',
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
});

const model = defineModel();

const isVisible = ref(false);

const onVisible = (event) => {
  isVisible.value = event;
};

const itemClick = (item) => {
  if (typeof item === 'object') {
    model.value = item[props.idItem];
  } else {
    model.value = item;
  }
};

const displayValue = computed(() => {
  if (!model.value) return '';

  const selectedItem = props.list.find((item) => {
    if (typeof item === 'object') {
      return item[props.idItem] === model.value;
    } else {
      return item === model.value;
    }
  });

  return selectedItem ? (typeof selectedItem === 'object' ? selectedItem[props.nameItem] : selectedItem) : '';
});
</script>

<style lang="scss" scoped>
.base-dropdown {
  &__title {
    padding-left: 8px;
    padding-bottom: 2px;
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
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
  box-shadow: 0px 4px 20px 0px #0000008C;
  min-width: 182px;
  width: 100%;
  &--active {
    border-radius: 8px 8px 0 0;
  }
  span {
    color: var(--color-white);
    font-size: 14px;
    line-height: 14px;
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
      transition: .2s ease-in-out transform;
    }
    &--active {
      img {
        transform: rotate(180deg);
      }
    }
  }
}
:deep(.el-dropdown-menu__item) {
  &:hover, &:default {
    color: var(--color-golden) !important;
    background-color: var(--color-gray);
  }
  &:default {
    background-color: unset;
  }
}
:deep(.base-dropdown__list) {
  left: 0 !important;
  top: 100% !important;
  height: fit-content !important;
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
}
</style>