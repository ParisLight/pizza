<template>
  <div class="menu-navigation">
    <div class="menu-navigation__list">
      <router-link
        class="menu-navigation__item"
        v-for="route in links"
        :key="route.name"
        :to="route.to"
        @click="emit('navigate')"
      >
        <span>{{ route.name }}</span>
      </router-link>
    </div>
    <div class="menu-navigation__footer">
      <div class="help menu-navigation__help">
        <div class="help__icon">
          <img src="@/assets/images/phone-icon.svg" alt="phone" />
        </div>
        <div class="help__text">
          <span>
            позвони нам, если возникли <br />
            трудности
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ROUTE_TYPE, ROUTES } from "@/shared/config"

const emit = defineEmits<{
  navigate: []
}>()

interface IMenuLink {
  name: string
  to: ROUTE_TYPE
}

const links: IMenuLink[] = [
  {
    name: "Меню",
    to: ROUTES.mainPage,
  },
  {
    name: "Корзина",
    to: ROUTES.order,
  },
  {
    name: "Профиль",
    to: ROUTES.profile,
  },
  {
    name: "История заказов",
    to: ROUTES.myOrders,
  },
]
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
      font-size: var(--font-size-lg);
      line-height: 24px;
      font-weight: var(--font-weight-regular);
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
      font-size: var(--font-size-xs);
      line-height: 12px;
      font-weight: var(--font-weight-light);
      color: var(--color-white);
      opacity: 0.5;
    }
  }
}
</style>
