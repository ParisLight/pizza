import { defineStore } from "pinia"
import type { IPopupProps, IPopupState } from "./types"
import type { PopupName } from "../config/popupRegistry"
import { lockScroll, unlockScroll } from "@/shared/lib"

export const usePopupModel = defineStore("popup", {
  state: () => ({
    popups: [] as IPopupState[],
  }),

  actions: {
    openPopup(name: PopupName, props?: IPopupProps) {
      const id = Math.random().toString(36).substring(2)

      if (!id) return

      this.popups.push({ id, name, props })

      lockScroll()
    },

    closePopup(id: string) {
      const currentPopup: IPopupState | undefined = this.popups.find((popup) => popup.id === id)

      if (!currentPopup) return

      if (typeof currentPopup.props?.closeCallback === "function") {
        currentPopup.props.closeCallback()
      }

      this.popups = this.popups.filter((popup) => popup !== currentPopup)

      if (this.popups.length === 0) {
        unlockScroll()
      }
    },
  },
})
