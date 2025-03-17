<template>
  <el-radio-group
    class="radio-group"
    v-model="model"
    v-bind="$attrs"
  >
    <base-radiobutton
      v-for="(item, index) in list"
      :key="'radio_item_' + index"
      :label="displayItemName(item)"
      :value="getItemValue(item)"
      :name="displayItemName(item)"
    />
  </el-radio-group>
</template>

<script setup>
import { BaseRadiobutton } from "@/shared/ui/base-radio-button";

const model = defineModel()

const props = defineProps({
  list: {
    type: [Object, Array],
    required: true
  },
  itemId: {
    type: String,
    required: false,
    default: 'id'
  },
  itemName: {
    type: String,
    required: false,
    default: 'name'
  }
})

const displayItemName = (item) => {
  if(typeof item === 'object' && !Array.isArray(item)) return item[props.itemName]
  else if(item) return item

  return ''
}

const getItemValue = (item) => {
  if(typeof item === 'object' && !Array.isArray(item)) return item[props.itemId]
  else if(item) return item

  return ''
}
</script>

<style lang="scss" scoped>
.radio-group {
  column-gap: 16px;
  flex-wrap: wrap;
}
</style>