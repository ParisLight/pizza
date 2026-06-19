export const useInfinityScroll = (
  target: Ref<HTMLElement | undefined>,
  options: IntersectionObserverInit,
  intersectionCallback: () => void | Promise<void>,
) => {
  let observer: IntersectionObserver | null = null

  const callback: IntersectionObserverCallback = async ([entry]) => {
    if (!entry.isIntersecting) return
    await intersectionCallback()
  }

  onMounted(() => {
    observer = new IntersectionObserver(callback, options)

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
