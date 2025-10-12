const disableBodyScroll = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'

  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`
  }
}

const enableBodyScroll = (): void => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

export const useBodyScrollLock  = () => {
  const lockScroll = () => disableBodyScroll()
  const unlockScroll = () => enableBodyScroll()

  return { lockScroll, unlockScroll }
}