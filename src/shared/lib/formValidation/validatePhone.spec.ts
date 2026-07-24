import { expect, test, vi } from "vitest"
import { validatePhone } from "./validatePhone"

test("validatePhone rejects invalid phone", () => {
  const callback = vi.fn()

  validatePhone({}, "123", callback, {}, {})
  expect(callback).toHaveBeenCalledWith(expect.any(Error))
  expect(callback.mock.calls[0][0].message).toBe("Некорректный номер")

  callback.mockClear()
  validatePhone({}, "+7 953", callback, {}, {})
  expect(callback).toHaveBeenCalledWith(expect.any(Error))

  callback.mockClear()
  validatePhone({}, "", callback, {}, {})
  expect(callback).toHaveBeenCalledWith(expect.any(Error))
})

test("validatePhone accepts valid phone starting with 7", () => {
  const callback = vi.fn()

  validatePhone({}, "+7 (953) 283-14-12", callback, {}, {})
  expect(callback).toHaveBeenCalledWith()

  callback.mockClear()
  validatePhone({}, "79532831412", callback, {}, {})
  expect(callback).toHaveBeenCalledWith()
})
