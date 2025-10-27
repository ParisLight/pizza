import { defineStore } from "pinia";
import type { IUserModal } from "./types";
import { UserApi } from '../index.ts'

export const useUserModel = defineStore('user', {
  state: () => <IUserModal> {
      user: {}
    },

  actions: {
    async fetchUser (userId) {
      const output = await UserApi.fetchUserById(userId)
      if(!output || !output.length) return

      this.user = output[0]
    },
    async updateUser (userId: number, userData: IUserModal) {
      return await UserApi.updateUser(userId, userData)
    }
  }
})