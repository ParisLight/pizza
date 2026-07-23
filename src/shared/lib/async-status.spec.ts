import { expect, test } from "vitest"
import {
  canFetch,
  finishFetch,
  isEmpty,
  isError,
  isSkeleton,
  startFetch,
} from "@/shared/lib/async-status"

test("canFetch returns true for fetchable statuses", () => {
  expect(canFetch("idle")).toBe(true)
  expect(canFetch("success")).toBe(true)
  expect(canFetch("error")).toBe(true)
  expect(canFetch("empty")).toBe(true)
})

test("startFetch returns loading status", () => {
  expect(startFetch()).toBe("loading")
})

test("finishFetch returns empty or success status", () => {
  const isFirstLoad = true

  expect(finishFetch(0, isFirstLoad)).toBe("empty")
  expect(finishFetch(0, !isFirstLoad)).toBe("success")
  expect(finishFetch(1, isFirstLoad)).toBe("success")
})

test("isSkeleton return loading status", () => {
  expect(isSkeleton("loading")).toBe(true)
  expect(isSkeleton("empty")).toBe(false)
})

test("isEmpty returns empty status", () => {
  expect(isEmpty("empty")).toBe(true)
  expect(isEmpty("loading")).toBe(false)
})

test("isError returns error status", () => {
  expect(isError("error")).toBe(true)
  expect(isError("success")).toBe(false)
})
