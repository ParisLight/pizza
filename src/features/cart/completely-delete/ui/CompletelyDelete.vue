<template>
  <div class="confirmation-window completely-delete__confirmation-window">
    <div class="confirmation-window__title">
      <span>
        точно удалить <br>
        позицию?
      </span>
    </div>
    <div class="confirmation-window__actions">
      <el-button
        class="confirmation-window__btn"
        color="var(--color-gray)"
        @click="cartModel.removeCompletelyFromCart(productId)"
      >
        да
      </el-button>
      <el-button
        class="confirmation-window__btn"
        color="var(--color-gray)"
        @click="onCancelClick"
      >
        отмена
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useCartModel } from "@/entities/cart";

const cartModel = useCartModel()

const emit = defineEmits(['cancelClick'])

const onCancelClick = () => {
    emit('cancelClick')
}

defineProps({
  productId: {
    type: [Number, String],
    required: true
  }
})
</script>

<style lang="scss" scoped>
.confirmation-window {
  padding: 12px;
  background-color: var(--color-gray);
  border-radius: 8px 8px 0 8px;
  right: 100%;
  &__title {
    text-align: center;
    span {
      font-size: 16px;
      line-height: 14px;
      font-weight: 700;
      color: var(--color-white);
    }
  }
  &__actions {
    display: flex;
    margin-top: 16px;
  }
  &__btn {
    border: 1px solid var(--color-golden);
    border-radius: 6px;
    color: var(--color-white);
  }
}
</style>