import { defineStore } from "pinia";
import { UserApi } from '../index.ts'
import type { IUser } from "./types";

export const useUserModel = defineStore('user', {
  state: () => ({
      user: null as IUser | null
  }),

  actions: {
    async fetchUserById (userId: number) {
      const userData = await UserApi.fetchUserById(userId)

      if(!userData) return

      this.user = userData
    },

    async updateUser (userId: number, userData: IUser) {
      const updatedData = await UserApi.updateUser(userId, userData)

      if(!updatedData) return

      this.user = updatedData
    }
  }
})
