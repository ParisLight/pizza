import { beforeEach, expect, test, vi } from "vitest"

const { ElNotification } = vi.hoisted(() => ({
  ElNotification: vi.fn(),
}))

vi.mock("element-plus/es", () => ({
  ElNotification,
}))

import { notifyError, notifySuccess } from "./notifications"

beforeEach(() => {
  ElNotification.mockClear()
})

test("notifyError calls ElNotification with error type", () => {
  notifyError("Не удалось сохранить")

  expect(ElNotification).toHaveBeenCalledWith({
    title: "Не вышло",
    message: "Не удалось сохранить",
    type: "error",
  })
})

test("notifySuccess calls ElNotification with success type", () => {
  notifySuccess("Сохранено")

  expect(ElNotification).toHaveBeenCalledWith({
    title: "Готово",
    message: "Сохранено",
    type: "success",
  })
})
