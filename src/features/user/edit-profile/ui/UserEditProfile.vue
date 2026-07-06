<template>
  <div class="user-profile-form">
    <el-form ref="formRef" :model="form" :rules="formRules" class="user-info" label-width="auto">
      <el-form-item class="user-info__row" prop="name">
        <base-input v-model="form.name" class="user-info__field" placeholder="Имя" title="Имя" />
      </el-form-item>
      <el-form-item class="user-info__row" prop="number">
        <base-input
          v-model="form.number"
          class="user-info__field"
          v-maska
          :data-maska="INPUT_MASK.mask"
          :placeholder="INPUT_MASK.placeholder"
          :formatter="numberFormat"
          title="номер телефона"
        />
      </el-form-item>
      <el-form-item class="user-info__row" prop="address">
        <base-input
          v-model="form.address"
          class="user-info__field field-address"
          title="адрес доставки"
          placeholder="Адрес"
        />
      </el-form-item>
      <div class="user-info__row col-gap-16">
        <el-form-item class="user-info__field" prop="floor">
          <base-input
            v-model="form.floor"
            class="field-flat"
            title="этаж"
            placeholder="Этаж"
            :formatter="digitalFormat"
            :parser="digitalFormat"
          />
        </el-form-item>
        <el-form-item class="user-info__field" prop="flat">
          <base-input
            v-model="form.flat"
            class="user-info__field field-flat"
            title="квартира"
            placeholder="Номер"
            :formatter="digitalFormat"
            :parser="digitalFormat"
          />
        </el-form-item>
      </div>
    </el-form>
    <base-btn
      v-if="hasChanges"
      class="page__base-btn"
      color="var(--color-purple)"
      :loading="isSavingProfile"
      @click.stop="saveProfile"
    >
      Сохранить
    </base-btn>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput } from "@/shared/ui/base-input"
import { digitalFormat, numberFormat } from "@/shared/lib"
import { useEditProfile } from "../model"
import { INPUT_MASK } from "@/shared/config"
import { BaseBtn } from "@/shared/ui/base-btn"
import type { FormInstance } from "element-plus"

const formRef = ref<FormInstance | undefined>()

const { form, formRules, hasChanges, isSavingProfile, saveProfile } = useEditProfile(formRef)
</script>

<style lang="scss" scoped>
.page {
  &__base-btn {
    margin-top: auto;
    &:deep(.el-button) {
      height: 47px;
      padding: 10px 15px;
      font-variant: all-small-caps;
      width: 100%;
    }
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
    margin-bottom: 0;
  }
  &__field {
    width: 100%;
  }
}
</style>
