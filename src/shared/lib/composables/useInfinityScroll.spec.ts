import { afterEach, expect, test, vi } from "vitest"
import { defineComponent, ref } from "vue"
import { mount } from "@vue/test-utils"
import { useInfinityScroll } from "./useInfinityScroll"

type ObserverCallback = IntersectionObserverCallback

let observerCallback: ObserverCallback | null = null
const observe = vi.fn()
const disconnect = vi.fn()

afterEach(() => {
  observerCallback = null
  observe.mockClear()
  disconnect.mockClear()
  vi.unstubAllGlobals()
})

const stubIntersectionObserver = () => {
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn((callback: ObserverCallback) => {
      observerCallback = callback
      return { observe, disconnect, unobserve: vi.fn(), takeRecords: vi.fn() }
    }),
  )
}

test("useInfinityScroll observes target on mount and disconnects on unmount", () => {
  stubIntersectionObserver()

  const el = document.createElement("div")
  const target = ref<HTMLElement | undefined>(el)
  const intersectionCallback = vi.fn()

  const wrapper = mount(
    defineComponent({
      setup() {
        useInfinityScroll(target, { threshold: 0 }, intersectionCallback)
        return () => null
      },
    }),
  )

  expect(observe).toHaveBeenCalledWith(el)

  wrapper.unmount()
  expect(disconnect).toHaveBeenCalledOnce()
})

test("useInfinityScroll does not observe when target is empty", () => {
  stubIntersectionObserver()

  const target = ref<HTMLElement | undefined>()
  const wrapper = mount(
    defineComponent({
      setup() {
        useInfinityScroll(target, {}, vi.fn())
        return () => null
      },
    }),
  )

  expect(observe).not.toHaveBeenCalled()
  wrapper.unmount()
})

test("useInfinityScroll calls callback only when target intersects", async () => {
  stubIntersectionObserver()

  const el = document.createElement("div")
  const target = ref<HTMLElement | undefined>(el)
  const intersectionCallback = vi.fn()

  const wrapper = mount(
    defineComponent({
      setup() {
        useInfinityScroll(target, {}, intersectionCallback)
        return () => null
      },
    }),
  )

  await observerCallback?.(
    [{ isIntersecting: false } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )
  expect(intersectionCallback).not.toHaveBeenCalled()

  await observerCallback?.(
    [{ isIntersecting: true } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )
  expect(intersectionCallback).toHaveBeenCalledOnce()

  wrapper.unmount()
})
