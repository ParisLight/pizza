<template>
  <div class="current-order">
    <el-form :ref="setFormRef" :model="form" :rules="formRules">
      <div class="current-order__row">
        <el-form-item prop="payerName" class="current-order__field">
          <base-input v-model="form.payerName" title="имя" placeholder="Введите своё имя" />
        </el-form-item>
        <el-form-item prop="payerNumber" class="current-order__field">
          <base-input
            v-model="form.payerNumber"
            title="номер телефона"
            v-maska
            :data-maska="INPUT_MASK.mask"
            :placeholder="INPUT_MASK.placeholder"
            :formatter="numberFormat"
          />
        </el-form-item>
      </div>
      <div class="current-order__row">
        <el-form-item prop="deliveryType">
          <base-radio-group v-model="form.deliveryType" :list="DELIVERY_OPTIONS" />
        </el-form-item>
      </div>
      <template v-if="form.deliveryType === DeliveryType.DELIVERY">
        <div class="current-order__row">
          <el-form-item prop="deliveryAddress" class="current-order__field">
            <base-input
              v-model="form.deliveryAddress"
              title="адрес доставки"
              placeholder="Введите адрес"
            />
          </el-form-item>
        </div>
        <div class="current-order__row">
          <el-form-item prop="flat" class="current-order__field">
            <base-input
              v-model="form.flat"
              title="квартира"
              placeholder="1"
              :formatter="digitalFormat"
              :parser="digitalFormat"
            />
          </el-form-item>
          <el-form-item prop="floor" class="current-order__field">
            <base-input
              v-model="form.floor"
              title="этаж"
              placeholder="3"
              :formatter="digitalFormat"
              :parser="digitalFormat"
            />
          </el-form-item>
        </div>
        <div class="current-order__row">
          <el-form-item prop="deliveryTime" class="current-order__field">
            <base-dropdown
              v-model="form.deliveryTime"
              title="Время доставки"
              name-item="name"
              :list="timeSlots"
            />
          </el-form-item>
        </div>
        <div class="current-order__row">
          <el-form-item prop="dontRingIntercom">
            <base-checkbox v-model="form.dontRingIntercom" label="Не звонить в домофон" />
          </el-form-item>
        </div>
      </template>
      <template v-if="form.deliveryType === DeliveryType.PICKUP">
        <div class="current-order__row">
          <el-form-item prop="readyBy" class="current-order__field">
            <base-dropdown
              v-model="form.readyBy"
              title="Приготовить ко времени"
              name-item="name"
              :list="timeSlots"
            />
          </el-form-item>
        </div>
      </template>
      <div class="current-order__row">
        <el-form-item prop="paymentType">
          <base-radio-group v-model="form.paymentType" :list="PAYMENT_OPTIONS" />
        </el-form-item>
      </div>
      <div class="current-order__row">
        <el-form-item prop="orderComment" class="current-order__field">
          <base-textarea
            v-model="form.orderComment"
            id="orderComment"
            title="комментарий"
            placeholder="Комментарий к заказу"
            rows="4"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from "@/shared/ui/base-input"
import { BaseDropdown } from "@/shared/ui/base-dropdown"
import { BaseCheckbox } from "@/shared/ui/base-checkbox"
import { BaseTextarea } from "@/shared/ui/base-textarea"
import { BaseRadioGroup } from "@/shared/ui/base-radio-group"
import { digitalFormat, numberFormat } from "@/shared/lib"
import { INPUT_MASK } from "@/shared/config"
import { type OrderFormValues } from "@/features/order"
import { DELIVERY_OPTIONS, DeliveryType, PAYMENT_OPTIONS, type TimeSlot } from "@/entities/order"
import type { FormRules } from "element-plus"
import type { VNodeRef } from "vue"

const props = defineProps<{
  form: OrderFormValues
  timeSlots: TimeSlot[]
  formRules: FormRules<OrderFormValues>
  setFormRef: VNodeRef
}>()

const { form, timeSlots, formRules } = toRefs(props)
</script>

<style lang="scss" scoped>
.current-order {
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  &__row {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }

  &__row-title {
    span {
      font-weight: var(--font-weight-regular);
      font-size: var(--font-size-sm);
      line-height: var(--font-size-md);
      font-variant: all-small-caps;
      opacity: 0.5;
    }
  }

  &__field {
    width: 100%;

    .base-input,
    .base-dropdown,
    .base-textarea {
      width: 100%;
    }
  }
}

.flex-col {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.flex-align-start {
  display: flex;
  align-items: flex-start;
}
</style>
