<template>
  <div class="nutrition-info popup__container">
    <div class="nutrition-info__total">
      <span>{{ nutrition.kcal }} ккал</span>
    </div>
    <div class="nutrition-info__bar">
      <div class="nutrition-item" :style="{width: getDashWidth().proteins + '%'}">
        <div
          class="nutrition-item__dash"
          :style="{ background: dashColors['proteins'] }"
        />
        <div class="nutrition-item__info">
          <span class="nutrition-item__name">Б:</span>
          <span class="nutrition-item__value" :style="{ color: dashColors['proteins'] }">{{ nutrition.proteins }}г</span>
        </div>
      </div>
      <div class="nutrition-item" :style="{width: getDashWidth().fats + '%'}">
        <div
          class="nutrition-item__dash"
          :style="{ background: dashColors['fats'] }"
        />
        <div class="nutrition-item__info">
          <span class="nutrition-item__name">Ж:</span>
          <span class="nutrition-item__value" :style="{ color: dashColors['fats'] }">{{ nutrition.fats }}г</span>
        </div>
      </div>
      <div class="nutrition-item" :style="{width: getDashWidth().carbs + '%'}">
        <div
          class="nutrition-item__dash"
          :style="{ background: dashColors['carbs'] }"
        />
        <div class="nutrition-item__info">
          <span class="nutrition-item__name">У:</span>
          <span class="nutrition-item__value" :style="{ color: dashColors['carbs'] }">{{ nutrition.carbs }}г</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { INutrition } from "@/entities/product";

const props = defineProps<{
  nutrition: INutrition;
}>();

const dashColors = {
  fats: 'var(--color-orange)',
  proteins: 'var(--color-green)',
  carbs: 'var(--color-golden)'
}

const getDashWidth = () => {
  const { fats, proteins, carbs } = props.nutrition
  const totalValue = parseFloat(proteins) + parseFloat(carbs) + parseFloat(fats)
  return {
    fats: fats <= 0 ? 0 : fats / totalValue * 100,
    proteins: proteins <= 0 ? 0 :  proteins / totalValue * 100,
    carbs: carbs <= 0 ? 0 : carbs / totalValue * 100
  }
}

</script>

<style lang="scss" scoped>
.nutrition-info {
  &__total {
    span {
      font-size: 12px;
      line-height: 14px ;
      color: var(--color-white);
      opacity: 0.4;
    }
  }
  &__bar {
    display: flex;
    margin-top: 8px;
  }
}
.nutrition-item {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 33%;
  transition: .2s ease-in-out width;
  &__dash {
    height: 4px;
    border-radius: 4px;
    width: 100%;
  }
  &__name {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--color-white);
    opacity: 0.4;
  }
  &__value {
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: green;
  }
}
</style>