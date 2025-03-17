<template>
  <div class="page">
    <header class="page__header">
      <div class="page__title">
        <span>профиль</span>
      </div>
      <div class="user-id">
        <span>id: {{ userModel.user.user_id }}</span>
      </div>
    </header>
    <div class="user-info page__user-info">
      <div class="user-info__row">
        <BaseInput
          class="user-info__field"
          placeholder="Имя"
          title="Имя"
          v-model="userModel.user.name"
        />
      </div>
      <div class="user-info__row">
        <BaseInput
          class="user-info__field"
          placeholder="Номер телефона"
          v-maska="'+7 (###) ### ## ##'"
          title="номер телефона"
          :formatter="FormatterLib.numberFormat"
          v-model="userModel.user.number"
        />
      </div>
      <div class="user-info__row">
        <BaseInput
          class="user-info__field field-address"
          title="адрес доставки"
          placeholder="Адрес"
          v-model="userModel.user.address"
        />
      </div>
      <div class="user-info__row">
        <BaseInput
          class="user-info__field field-flat"
          title="этаж"
          placeholder="Этаж"
          :formatter="FormatterLib.digitalFormat"
          :parser="FormatterLib.digitalFormat"
          v-model="userModel.user.floor"
        />
        <BaseInput
          class="user-info__field field-flat"
          title="квартира"
          :formatter="FormatterLib.digitalFormat"
          :parser="FormatterLib.digitalFormat"
          placeholder="Номер"
          v-model="userModel.user.flat"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { BaseInput } from "@/shared/ui/base-input";
import { useUserModel } from "@/entities/user";
import { FormatterLib } from '@/shared/lib'

const userModel = useUserModel()

</script>

<style lang="scss" scoped>
.page {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28px;
  }
  &__title {
    span {
      font-size: 24px;
      font-weight: 700;
      line-height: 14px;
      color: var(--color-golden);
      font-variant: all-small-caps;
    }
  }
  &__user-info {
    margin-top: 36px;
  }
}
.user-id {
  span {
    font-size: 16px;
    line-height: 14px;
    color: var(--color-golden);
    font-variant: all-small-caps;
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  &__row {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
  &__field {
    width: 100%;
  }
}
.field-address {
  flex-basis: 100%;
}
.field-flat {
  flex-basis: 50%;
}
</style>