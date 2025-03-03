import { defineStore } from "pinia";
import type { IPopupState } from './types'


export const usePopupModel = defineStore('popup', {
  state: () => ({
    popups: [] as IPopupState[]
  }),

  actions: {
    openPopup(name: string, props?: any) {
      const id = Math.random().toString(36).substring(2); // Генерация уникального ID
      this.popups.push({ id, name, props });
    },

    closePopup(id: string) {
      this.popups = this.popups.filter((popup) => popup.id !== id);
    },
  }
})