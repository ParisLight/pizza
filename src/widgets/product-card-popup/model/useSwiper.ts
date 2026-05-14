import type { Swiper as SwiperType } from "swiper/types";

export const useSwiper = (startIndex: number) => {
  const swiperInstance = ref<SwiperType | null>(null)
  const activeIndex = ref(0)

  const isReady = computed(() => !!swiperInstance.value)

  const onSwiper = (swiper: SwiperType): void => {
    swiperInstance.value = swiper

    if(startIndex) {
      slideTo(startIndex)
    } else {
      activeIndex.value = swiper.activeIndex
    }
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
