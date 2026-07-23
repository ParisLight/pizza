import type { Swiper as SwiperType } from "swiper/types"
import { toValue, type MaybeRefOrGetter } from "vue"

export const useSwiper = (startIndex: MaybeRefOrGetter<number> = 0) => {
  const swiperInstance = ref<SwiperType | null>(null)
  const activeIndex = ref(0)

  const isReady = computed(() => !!swiperInstance.value)

  const onSwiper = (swiper: SwiperType): void => {
    swiperInstance.value = swiper
    slideTo(toValue(startIndex))
  }

  const onSlideChange = (swiper: SwiperType) => {
    activeIndex.value = swiper.activeIndex
  }

  const slideTo = (index: number) => {
    swiperInstance.value?.slideTo(index)
    activeIndex.value = index
  }

  return { swiperInstance, isReady, activeIndex, onSwiper, onSlideChange, slideTo }
}
