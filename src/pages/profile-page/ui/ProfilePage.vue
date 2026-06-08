<template>
  <div class="page">
    <div class="page__header">
      <div class="page__title">
        <span>профиль</span>
      </div>
      <div class="user-id">
        <span>id: {{ userModel.user?.userId ?? 0 }}</span>
      </div>
    </div>
    <user-edit-profile class="page__form" />
  </div>
</template>

<script setup lang="ts">
import { UserEditProfile } from "@/features/user"
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
