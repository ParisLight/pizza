<template>
  <el-skeleton animated class="order-card">
    <template #template>
      <div class="order-card__row">
        <div class="order-card__row-col">
          <el-skeleton-item variant="text" class="label" />
          <el-skeleton-item variant="text" class="value-short" />
        </div>

        <div class="order-card__row-col">
          <el-skeleton-item variant="text" class="label" />
          <el-skeleton-item variant="text" class="value-medium" />
        </div>
      </div>

      <div class="order-card__row">
        <div class="order-card__row-col details">
          <el-skeleton-item variant="text" class="label" />

          <el-skeleton-item variant="text" class="detail-line" />
          <el-skeleton-item variant="text" class="detail-line" />
          <el-skeleton-item variant="text" class="detail-line short" />
        </div>
      </div>

      <div class="order-card__row">
        <div class="order-card__row-col">
          <el-skeleton-item variant="text" class="label" />
          <el-skeleton-item variant="text" class="value-short" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.order-card {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-radius: 16px;
  background-color: var(--color-main);
  padding: 16px;
  box-shadow: 0 2px 8px 0 #0000008c;

  &__row {
    display: flex;
    column-gap: 24px;
  }

  &__row-col {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
}

.label {
  width: 80px;
  height: 12px;
}

.value-short {
  width: 90px;
  height: 18px;
}

.value-medium {
  width: 120px;
  height: 18px;
}

.details {
  width: 100%;
}

.detail-line {
  width: 100%;
  height: 16px;
}

.detail-line.short {
  width: 60%;
}
</style>
