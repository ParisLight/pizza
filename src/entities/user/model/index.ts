import { defineStore } from "pinia";
import type { IUserModal } from "./types";
import { UserApi } from '../index.ts'

export const useUserModel = defineStore({
  id: 'user',
  state: () =>
    <IUserModal>{
      user: {
        id: 1,
        name: 'Konstantin',
        number: '89221234412',
        flat: 12,
        address: 'pushkina street, Moscow',
        username: '@qwep',
        floor: 3,
      }
    },

  actions: {
    async fetchUser (userId) {
      const output = await UserApi.fetchUserByTgId(userId)
      if(!output || !output.length) return

      this.user = output[0]
    },
  }
})