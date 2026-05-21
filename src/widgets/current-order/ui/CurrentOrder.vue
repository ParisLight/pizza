<template>
  <div class="current-order">
    <div class="current-order__row">
      <base-input
        v-model="form.payerName"
        class="current-order__field"
        title="имя"
        placeholder="Введите своё имя"
      />
      <base-input
        v-model="form.payerNumber"
        class="current-order__field"
        title="номер телефона"
        placeholder="+7 (999) 999 99 99"
        v-maska="'+7 (###) ### ## ##'"
        :formatter="numberFormat"
      />
    </div>
    <div class="current-order__row">
      <base-input
        v-model="form.deliveryAddress"
        class="current-order__field"
        title="адрес доставки"
        placeholder="Введите адрес"
      />
    </div>
    <div class="current-order__row">
      <base-input
        v-model="form.flat"
        class="current-order__field"
        title="квартира"
        placeholder="1"
        :formatter="digitalFormat"
        :parser="digitalFormat"
      />
      <base-input
        v-model="form.floor"
        class="current-order__field"
        title="этаж"
        placeholder="3"
        :formatter="digitalFormat"
        :parser="digitalFormat"
      />
    </div>
    <div class="current-order__row">
      <base-radio-group
        v-model="form.deliveryType"
        :list="DELIVERY_OPTIONS"
      />
    </div>
    <div class="current-order__row">
      <base-dropdown
        v-model="form.deliveryTime"
        class="current-order__field"
        title="Время доставки"
        :list="deliverySlots"
      />
    </div>
    <div class="current-order__row">
      <base-checkbox
        v-model="form.dontRingIntercom"
        label="Не звонить в домофон"
      />
    </div>
    <div class="current-order__row">
      <base-radio-group
        v-model="form.paymentType"
        :list="PAYMENT_OPTIONS"
      />
    </div>
    <div class="current-order__row">
      <base-textarea
        v-model="form.orderComment"
        class="current-order__field"
        title="комментарий"
        placeholder="Комментарий к заказу"
        rows="4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from "@/shared/ui/base-input"
import { BaseDropdown } from "@/shared/ui/base-dropdown"
import { BaseCheckbox } from "@/shared/ui/base-checkbox"
import { BaseTextarea } from "@/shared/ui/base-textarea"
import { BaseRadioGroup } from "@/shared/ui/base-radio-group"
import { useFormatter } from "@/shared/lib"
import { useCurrentOrder } from "@/features/order"
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "@/entities/order"

const { form, deliverySlots } = useCurrentOrder()

const { digitalFormat, numberFormat } = useFormatter()

</script>

<style lang="scss" scoped>
.current-order {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-top: 28px;

  &__row {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }

  &__row-title {
    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      font-variant: all-small-caps;
      opacity: 0.5;
    }
  }

  &__field {
    width: 100%;
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
