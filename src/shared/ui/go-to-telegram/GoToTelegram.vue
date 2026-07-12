<template>
  <div class="go-to-telegram">
    <img class="go-to-telegram__logo" src="@/assets/moon-logo.png" alt="Moon Pizza" />

    <div class="go-to-telegram__content">
      <h1 class="go-to-telegram__title">Moon Pizza</h1>
      <p class="go-to-telegram__text">
        Приложение работает только внутри Telegram. Откройте бота и запустите Mini App оттуда.
      </p>

      <a
        class="go-to-telegram__link"
        :href="botUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Открыть @{{ botUsername }}
      </a>
    </div>

    <img class="go-to-telegram__pizza" src="@/assets/images/pizza.png" alt="pizza" />
  </div>
</template>

<script setup lang="ts">
const botUsername = "dev_v1_moon_bot"
const botUrl = `https://t.me/${botUsername}`
</script>

<style scoped lang="scss">
.go-to-telegram {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 24px;
  text-align: center;
  background: var(--color-background);
  row-gap: 24px;

  &__logo {
    width: 72px;
    height: 72px;
    object-fit: contain;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
    max-width: 320px;
  }

  &__title {
    font-size: 28px;
    line-height: 1.2;
    color: var(--color-golden);
    font-weight: 700;
  }

  &__text {
    font-size: 16px;
    line-height: 1.4;
    color: var(--color-white);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 20px;
    border-radius: var(--radius-8);
    background: var(--color-purple);
    color: var(--color-white);
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: var(--color-purple-light);
    }
  }

  &__pizza {
    width: 140px;
    object-fit: contain;
    opacity: 0.9;
  }
}
</style>
