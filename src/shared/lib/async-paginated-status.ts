import type { PaginatedStatus } from "../config"
import { finishFetch } from "./async-status"

export const canFetchPaginated = (status: PaginatedStatus, hasMore = true) => {
  if (status === "loading" || status === "loadingMore") return false
  if (status === "success" && !hasMore) return false
  if (status === "empty" && !hasMore) return false
  return status === "idle" || status === "success" || status === "error" || status === "empty"
}

export const startPaginatedFetch = (
  status: PaginatedStatus,
  hasData: boolean,
): PaginatedStatus => {
  if (status === "idle" || (status === "error" && !hasData)) return "loading"
  return "loadingMore"
}

export const isPaginatedSkeleton = (status: PaginatedStatus) => {
  return status === "loading"
}

export const isPaginatedEmpty = (status: PaginatedStatus) => {
  return status === "empty"
}

export const isLoadingMore = (status: PaginatedStatus) => {
  return status === "loadingMore"
}

export { finishFetch as finishPaginatedFetch }
