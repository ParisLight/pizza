import { expect, test } from "vitest"
import {
  canFetchPaginated,
  finishPaginatedFetch,
  isLoadingMore,
  isPaginatedEmpty,
  isPaginatedSkeleton,
  startPaginatedFetch,
} from "./async-paginated-status"

test("canFetchPaginated returns false while loading", () => {
  expect(canFetchPaginated("loading")).toBe(false)
  expect(canFetchPaginated("loadingMore")).toBe(false)
})

test("canFetchPaginated returns false when there is no more data", () => {
  expect(canFetchPaginated("success", false)).toBe(false)
  expect(canFetchPaginated("empty", false)).toBe(false)
})

test("canFetchPaginated returns true for fetchable statuses", () => {
  expect(canFetchPaginated("idle")).toBe(true)
  expect(canFetchPaginated("success", true)).toBe(true)
  expect(canFetchPaginated("error")).toBe(true)
  expect(canFetchPaginated("empty", true)).toBe(true)
})

test("startPaginatedFetch returns loading on first load", () => {
  expect(startPaginatedFetch("idle", false)).toBe("loading")
  expect(startPaginatedFetch("error", false)).toBe("loading")
})

test("startPaginatedFetch returns loadingMore when data already exists", () => {
  expect(startPaginatedFetch("success", true)).toBe("loadingMore")
  expect(startPaginatedFetch("error", true)).toBe("loadingMore")
  expect(startPaginatedFetch("empty", true)).toBe("loadingMore")
})

test("finishPaginatedFetch returns empty or success status", () => {
  expect(finishPaginatedFetch(0, true)).toBe("empty")
  expect(finishPaginatedFetch(0, false)).toBe("success")
  expect(finishPaginatedFetch(1, true)).toBe("success")
})

test("isPaginatedSkeleton returns true only for loading", () => {
  expect(isPaginatedSkeleton("loading")).toBe(true)
  expect(isPaginatedSkeleton("loadingMore")).toBe(false)
})

test("isPaginatedEmpty returns true only for empty", () => {
  expect(isPaginatedEmpty("empty")).toBe(true)
  expect(isPaginatedEmpty("success")).toBe(false)
})

test("isLoadingMore returns true only for loadingMore", () => {
  expect(isLoadingMore("loadingMore")).toBe(true)
  expect(isLoadingMore("loading")).toBe(false)
})
