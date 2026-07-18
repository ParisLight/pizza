import { defineStore } from "pinia"
import * as UserApi from "../api"
import type { IUser } from "./types.ts"

export const useUserModel = defineStore("user", {
  state: () => ({
    user: null as IUser | null,
  }),

  actions: {
    async authUser(initData: string) {
      const user = await UserApi.authWithTelegram(initData)

      if (!user) return

      this.user = user
    },

    async updateUser(userData: IUser) {
      if (!this.user) return

      const updatedData = await UserApi.updateUser(this.user.userId, userData)

      if (!updatedData) return false

      this.user = updatedData

      return true
    },
  },
})
