import { defineStore } from "pinia";
import type { IUserModal } from "./types";

const useUserModal = defineStore({
  id: 'user',
  state: () =>
    <IUserModal>{
      user: {
        id: 1,
        name: 'Konstantin',
        number: 89221234412,
        flat: 12,
        address: 'pushkina street, Moscow',
        username: '@qwep'
      }
    },

  actions: {
    getUser(id: number) {
      // ....
    },
    updateUserInfo() {
    //   ....
    }
  }
})