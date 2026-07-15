import { afterEach, expect, test, vi } from "vitest"
import { lockScroll, unlockScroll } from "./scroll-lock"

afterEach(() => {
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""
  vi.restoreAllMocks()
})

test("lockScroll hides body overflow", () => {
  vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024)
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(1024)

  lockScroll()

  expect(document.body.style.overflow).toBe("hidden")
  expect(document.body.style.paddingRight).toBe("")
})

test("lockScroll adds padding when scrollbar is present", () => {
  vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024)
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(1008)

  lockScroll()

  expect(document.body.style.overflow).toBe("hidden")
  expect(document.body.style.paddingRight).toBe("16px")
})

test("unlockScroll resets body styles", () => {
  document.body.style.overflow = "hidden"
  document.body.style.paddingRight = "16px"

  unlockScroll()

  expect(document.body.style.overflow).toBe("")
  expect(document.body.style.paddingRight).toBe("")
})
