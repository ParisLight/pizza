import type { PaginatedStatus } from "../config"

export const useAsyncStatus = () => {
  const canFetch = (status: PaginatedStatus) => {
    return status === "idle" || status === "success" || status === "error" || status === "empty"
  }

  const startFetch = (status: PaginatedStatus, hasData: boolean): PaginatedStatus => {
    if (status === "idle" || (status === "error" && !hasData)) return "loading"
    return "loadingMore"
  }

  const finishFetch = (itemCount: number, isFirstLoad: boolean): PaginatedStatus => {
    if (itemCount === 0 && isFirstLoad) return "empty"
    return "success"
  }

  const isSkeleton = (status: PaginatedStatus) => {
    return status === "loading"
  }

  const isLoadingMore = (status: PaginatedStatus) => {
    return status === "loadingMore"
  }

  return { canFetch, startFetch, finishFetch, isSkeleton, isLoadingMore }
}
