import { afterEach, expect, test, vi } from "vitest"
import { initTelegram } from "./initTelegram"

afterEach(() => {
  vi.unstubAllGlobals()
})

test("initTelegram returns null entity when Telegram WebApp is missing", () => {
  vi.stubGlobal("Telegram", undefined)

  expect(initTelegram()).toEqual({
    telegram: null,
    isTelegram: false,
    initData: null,
  })
})

test("initTelegram prepares WebApp and returns initData", () => {
  const telegram = {
    ready: vi.fn(),
    expand: vi.fn(),
    initData: "query_id=1",
  }

  vi.stubGlobal("Telegram", { WebApp: telegram })

  expect(initTelegram()).toEqual({
    telegram,
    isTelegram: true,
    initData: "query_id=1",
  })
  expect(telegram.ready).toHaveBeenCalledOnce()
  expect(telegram.expand).toHaveBeenCalledOnce()
})

test("initTelegram returns null initData when it is empty", () => {
  const telegram = {
    ready: vi.fn(),
    expand: vi.fn(),
    initData: "",
  }

  vi.stubGlobal("Telegram", { WebApp: telegram })

  expect(initTelegram()).toEqual({
    telegram,
    isTelegram: true,
    initData: null,
  })
})
