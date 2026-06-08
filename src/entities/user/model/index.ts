import { defineStore } from "pinia"
import { UserApi } from "../index.ts"
import type { IUser } from "./types"

export const useUserModel = defineStore("user", {
  state: () => ({
    user: null as IUser | null,
  }),

  actions: {
    async fetchUserById(userId: number) {
      const userData = await UserApi.fetchUserById(userId)

      if (!userData) return

      this.user = userData
    },

    async updateUser(userData: IUser) {
      if (!this.user) return
      console.log(
        {
          currentUse: this.user,
          userData: userData,
        },
        "update_user_get__",
      )
      const updatedData = await UserApi.updateUser(this.user.userId, userData)

      if (!updatedData) return false

      this.user = updatedData

      return true
    },
  },
})
