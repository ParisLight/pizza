<template>
  <div class="page">
    <div class="page__header">
      <div class="page__title">
        <span>профиль</span>
      </div>
      <div class="user-id">
        <span>id: {{ userModel.user?.user_id ?? 0 }}</span>
      </div>
    </div>
    <user-profile-form class="page__form">
      <template #actions="{ hasChanges, submitForm, isSendingForm }">
        <base-btn
          v-if="hasChanges"
          class="page__base-btn"
          color="var(--color-purple)"
          :loading="isSendingForm"
          @click.stop="submitForm"
        >
          Сохранить
        </base-btn>
      </template>
    </user-profile-form>
  </div>
</template>

<script setup lang="ts">
import { BaseBtn } from "@/shared/ui/base-btn"
import { UserProfileForm } from "@/features/user"
import { useUserModel } from "@/entities/user"

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
  &__form {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 36px;
  }
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
.user-id {
  span {
    font-size: 16px;
    line-height: 14px;
    color: var(--color-golden);
    font-variant: all-small-caps;
  }
}
</style>