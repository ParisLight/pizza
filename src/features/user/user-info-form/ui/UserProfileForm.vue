<template>
  <div class="user-profile-form">
    <el-form
      ref="ruleFormRef"
      class="user-info"
      :model="currentData"
      :rules="profileFormRules"
      label-width="auto"
    >
      <el-form-item class="user-info__row" prop="name">
        <BaseInput
          class="user-info__field"
          placeholder="Имя"
          title="Имя"
          v-model="currentData.name"
        />
      </el-form-item>
      <el-form-item class="user-info__row" prop="number">
        <BaseInput
          class="user-info__field"
          placeholder="Номер телефона"
          v-maska="'+7 (###) ### ## ##'"
          title="номер телефона"
          :formatter="numberFormat"
          v-model="currentData.number"
        />
      </el-form-item>
      <el-form-item class="user-info__row" prop="address">
        <BaseInput
          class="user-info__field field-address"
          title="адрес доставки"
          placeholder="Адрес"
          v-model="currentData.address"
        />
      </el-form-item>
      <div class="user-info__row">
        <el-form-item
          class="user-info__field"
          prop="floor"
        >
          <BaseInput
            class=" field-flat"
            title="этаж"
            placeholder="Этаж"
            :formatter="digitalFormat"
            :parser="digitalFormat"
            v-model="currentData.floor"
          />
        </el-form-item>
        <el-form-item
          class="user-info__field"
          prop="flat"
        >
          <BaseInput
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
import { BaseInput } from "@/shared/ui/base-input";
import { useFormatter } from "@/shared/lib";
import { useUserProfileForm } from "../model"
import { FormInstance } from "element-plus"

const ruleFormRef = ref<FormInstance>()

const { numberFormat, digitalFormat } = useFormatter()

const { hasChanges, currentData, profileFormRules, submitForm, isSendingForm } = useUserProfileForm()
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