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
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
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
  }
}
.user-id {
  span {
    font-size: var(--font-size-lg);
    line-height: 14px;
    color: var(--color-golden);
    font-variant: all-small-caps;
  }
}
</style>
