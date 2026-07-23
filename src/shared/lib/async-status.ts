import type { LoadingStatus } from "../config"

export const canFetch = (status: LoadingStatus) => {
  return status === "idle" || status === "success" || status === "error" || status === "empty"
}

export const startFetch = (): LoadingStatus => {
  return "loading"
}

export const finishFetch = (itemCount: number, isFirstLoad: boolean): LoadingStatus => {
  if (itemCount === 0 && isFirstLoad) return "empty"
  return "success"
}

export const isSkeleton = (status: LoadingStatus) => {
  return status === "loading"
}

export const isEmpty = (status: LoadingStatus) => {
  return status === "empty"
}

export const isError = (status: LoadingStatus) => {
  return status === "error"
}
