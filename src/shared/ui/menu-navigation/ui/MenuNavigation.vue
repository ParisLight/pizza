<template>
  <div class="menu-navigation">
    <div class="menu-navigation__list">
      <router-link :to="routesMap.mainPage" @click.stop="navigationModel.closeNavigation()" class="menu-navigation__item">
        <span>Меню</span>
      </router-link>
      <router-link :to="routesMap.basket" @click.stop="navigationModel.closeNavigation()" class="menu-navigation__item">
        <span>Корзина</span>
      </router-link>
      <router-link :to="routesMap.profile" @click.stop="navigationModel.closeNavigation()" class="menu-navigation__item">
        <span>Профиль</span>
      </router-link>
      <router-link :to="routesMap.myOrders" @click.stop="navigationModel.closeNavigation()" class="menu-navigation__item">
        <span>История заказов</span>
      </router-link>
    </div>
    <div class="menu-navigation__footer">
      <div class="help menu-navigation__help">
        <div class="help__icon">
          <img src="@/assets/images/phone-icon.svg" alt="phone">
        </div>
        <div class="help__text">
          <span>
            позвони нам, если возникли <br>
            трудности
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { routesMap } from "@/app/providers/router/constants.ts";
import { useNavigationModel } from '@/features/navigation-switcher'

const navigationModel = useNavigationModel()
</script>

<style lang="scss" scoped>
.menu-navigation {
  box-shadow: 0 8px 8px #0000008c;
  padding: 16px 0;
  background-color: var(--color-background);
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }
  &__item {
    text-align: center;
    cursor: pointer;
    span {
      color: var(--color-golden);
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      font-variant: all-small-caps;
    }
  }
  &__help {
    justify-content: center;
    margin-top: 54px;
  }
}
.help {
  display: flex;
  align-items: center;
  column-gap: 4px;
  &__icon {
    width: 24px;
    height: 24px;
    font-size: 0;
    cursor: pointer;
    img {
      width: 100%;
      height: auto;
    }
  }
  &__text {
    text-align: center;
    span {
      font-size: 10px;
      line-height: 9px;
      font-weight: 300;
      color: var(--color-white);
      opacity: 0.5;
    }
  }
}
</style>