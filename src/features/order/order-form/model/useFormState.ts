import { useUserModel } from "@/entities/user"
import { type OrderFormValues } from "./types"
import { getEmptyOrderForm } from "../lib"

import { defineStore } from "pinia"

export const useFormState = defineStore("orderForm", {
  state: () => ({
    form: getEmptyOrderForm() as OrderFormValues,
  }),
  actions: {
    getFormValuesFromUserData(): OrderFormValues {
      const emptyForm = getEmptyOrderForm()

      const userModel = useUserModel()

      if (!userModel.user) {
        return emptyForm
      }

      const user = userModel.user

      emptyForm.flat = user.flat ? String(user.flat) : ""
      emptyForm.floor = user.floor ? String(user.floor) : ""
      emptyForm.deliveryAddress = user.address
      emptyForm.payerName = user.name
      emptyForm.payerNumber = user.number

      return emptyForm
    },

    prefillForm() {
      Object.assign(this.form, this.getFormValuesFromUserData())
    },
  },
})
