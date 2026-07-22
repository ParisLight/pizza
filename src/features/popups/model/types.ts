export interface IPopupState {
  id: string
  name: string
  props?: Record<string, unknown>
}

export interface IPopupProps {
  closeCallback?: () => void
  classes?: string | string[] | Record<string, boolean>
  [key: string]: unknown
}
