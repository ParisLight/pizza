import { useDebounceFn } from "@vueuse/core"

type PersistFn = (userId: number) => Promise<void>
type DebouncedPersist = PersistFn & {
  cancel: () => void
}

export function createPersistDebouncer(persist: PersistFn, ms = 300) {
  const debounced = useDebounceFn(persist, ms) as unknown as DebouncedPersist

  return {
    schedule: (userId: number) => {
      debounced(userId)
    },
    async flush(userId: number) {
      debounced.cancel()
      await persist(userId)
    },
    cancel() {
      debounced.cancel()
    },
  }
}
