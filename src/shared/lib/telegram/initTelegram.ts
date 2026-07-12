import type { WebApp } from "telegram-web-app"

type TelegramEntity = {
  isTelegram: boolean
  telegram: WebApp | null
  initData: string | null
}

export const initTelegram = (): TelegramEntity => {
  const telegram = window.Telegram?.WebApp

  const isTelegram = !!telegram

  if (!isTelegram) {
    return { telegram: null, isTelegram: isTelegram, initData: null }
  }

  telegram.ready()
  telegram.expand()

  const initData = telegram.initData

  return { telegram, isTelegram, initData }
}
