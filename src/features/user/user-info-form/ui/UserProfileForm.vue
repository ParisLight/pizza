<template>
  <div class="user-profile-form">
    <el-form
      ref="ruleFormRef"
      :model="currentData"
      class="user-info"
      :rules="profileFormRules"
      label-width="auto"
    >
      <el-form-item class="user-info__row" prop="name">
        <base-input
          v-model="currentData.name"
          class="user-info__field"
          placeholder="Имя"
          title="Имя"
        />
      </el-form-item>
      <el-form-item class="user-info__row" prop="number">
        <base-input
          v-model="currentData.number"
          class="user-info__field"
          v-maska
          :data-maska="INPUT_MASK.mask"
          :placeholder="INPUT_MASK.placeholder"
          title="номер телефона"
          :formatter="numberFormat"
        />
      </el-form-item>
      <el-form-item class="user-info__row" prop="address">
        <base-input
          class="user-info__field field-address"
          title="адрес доставки"
          placeholder="Адрес"
          v-model="currentData.address"
        />
      </el-form-item>
      <div class="user-info__row col-gap-16">
        <el-form-item class="user-info__field" prop="floor">
          <base-input
            class="field-flat"
            title="этаж"
            placeholder="Этаж"
            :formatter="digitalFormat"
            :parser="digitalFormat"
            v-model="currentData.floor"
          />
        </el-form-item>
        <el-form-item class="user-info__field" prop="flat">
          <base-input
            class="user-info__field field-flat"
            title="квартира"
            :formatter="digitalFormat"
            :parser="digitalFormat"
            placeholder="Номер"
            v-model="currentData.flat"
          />
        </el-form-item>
      </div>
    </el-form>
    <slot
      v-if="$slots.actions"
      name="actions"
      :has-changes="hasChanges"
      :submit-form="() => submitForm(ruleFormRef)"
      :is-sending-form="isSendingForm"
    />
  </div>
</template>

<script lang="ts" setup>
import { BaseInput } from "@/shared/ui/base-input"
import { useFormatter } from "@/shared/lib"
import { useUserProfileForm } from "../model"
import type { FormInstance } from "element-plus"
import { INPUT_MASK } from "@/shared/config"

const ruleFormRef = ref<FormInstance>()

const { numberFormat, digitalFormat } = useFormatter()

const { hasChanges, currentData, profileFormRules, submitForm, isSendingForm } =
  useUserProfileForm()
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  &__row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  &__field {
    width: 100%;
  }
}
</style>
