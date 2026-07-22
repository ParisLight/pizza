import type { PopupName } from "../config/popupRegistry"

export interface IPopupProps {
  closeCallback?: () => void
  classes?: string | string[] | Record<string, boolean>
  [key: string]: unknown
}

export interface IPopupState {
  id: string
  name: PopupName
  props?: IPopupProps
}
