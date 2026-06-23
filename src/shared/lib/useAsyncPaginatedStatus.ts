import type { PaginatedStatus } from "../config"
import { useAsyncStatus } from "./useAsyncStatus"

export const useAsyncPaginatedStatus = () => {
  const { finishFetch } = useAsyncStatus()

  const canFetch = (status: PaginatedStatus, hasMore = true) => {
    if (status === "loading" || status === "loadingMore") return false
    if (status === "success" && !hasMore) return false
    return status === "idle" || status === "success" || status === "error" || status === "empty"
  }

  const startFetch = (status: PaginatedStatus, hasData: boolean): PaginatedStatus => {
    if (status === "idle" || (status === "error" && !hasData)) return "loading"
    return "loadingMore"
  }

  const isSkeleton = (status: PaginatedStatus) => {
    return status === "loading"
  }

  const isLoadingMore = (status: PaginatedStatus) => {
    return status === "loadingMore"
  }

  return { canFetch, startFetch, finishFetch, isSkeleton, isLoadingMore }
}
