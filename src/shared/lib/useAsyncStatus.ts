import type { LoadingStatus } from "../config"

export const useAsyncStatus = () => {
  const canFetch = (status: LoadingStatus) => {
    return status === "idle" || status === "success" || status === "error" || status === "empty"
  }

  const startFetch = (): LoadingStatus => {
    return "loading"
  }

  const finishFetch = (itemCount: number, isFirstLoad: boolean): LoadingStatus => {
    if (itemCount === 0 && isFirstLoad) return "empty"
    return "success"
  }

  const isSkeleton = (status: LoadingStatus) => {
    return status === "loading"
  }

  return { canFetch, startFetch, finishFetch, isSkeleton }
}
