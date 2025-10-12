import { defineStore } from "pinia";
import type { IPopupState } from './types'
import { useBodyScrollLock } from '@/shared/lib'

const { lockScroll, unlockScroll } = useBodyScrollLock()

export const usePopupModel = defineStore('popup', {
  state: () => ({
    popups: [] as IPopupState[]
  }),

  actions: {
    openPopup(name: string, props?: any) {
      const id = Math.random().toString(36).substring(2);

      if(!id) return

      this.popups.push({ id, name, props });

      lockScroll()
    },

    closePopup(id: string) {
      const currentPopup: IPopupState = this.popups.find(popup => popup.id === id)

      if(!currentPopup) return

      if(typeof currentPopup.props.closeCallback === 'function') {
        currentPopup.props.closeCallback()
      }

      this.popups = this.popups.filter(popup => popup !== currentPopup);

      unlockScroll()
    },
  }
})