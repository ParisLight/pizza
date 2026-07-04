type PersistFn = (userId: number) => Promise<void>

export function createPersistDebouncer(persist: PersistFn, ms = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined

  const clear = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  return {
    schedule(userId: number) {
      clear()
      timer = setTimeout(() => {
        timer = undefined
        void persist(userId)
      }, ms)
    },

    async flush(userId: number) {
      clear()
      await persist(userId)
    },

    cancel() {
      clear()
    },
  }
}
