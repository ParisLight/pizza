export const unlockScroll = (): void => {
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""
}

export const lockScroll = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = "hidden"

  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`
  }
}
