import type { UserProfileForm } from "./types.ts"
import { EDIT_PROFILE_FORM_RULES } from "../config"
import { mapUserToForm } from "../lib"
import { useUserModel } from "@/entities/user"
import { useFormatter, useFormChanges } from "@/shared/lib"

export const useEditForm = () => {
  const userModel = useUserModel()
  const { normalizePhone } = useFormatter()

  const form = reactive<UserProfileForm>({
    name: "",
    flat: "",
    number: "",
    floor: "",
    address: "",
  })

  const normalizeForm = (data: UserProfileForm): UserProfileForm => ({
    ...data,
    number: normalizePhone(data.number),
  })

  const { saveData, hasChanges } = useFormChanges(() => form, { normalize: normalizeForm })

  const initializeForm = () => {
    if (!userModel.user) return

    const data = mapUserToForm(userModel.user)

    form.flat = data.flat
    form.number = data.number
    form.address = data.address
    form.floor = data.floor
    form.name = data.name
  }

  const formRules = EDIT_PROFILE_FORM_RULES

  watch(
    () => userModel.user?.userId,
    () => {
      if (!userModel.user?.userId) return

      initializeForm()
      saveData()
    },
    { immediate: true },
  )

  return { form, formRules, hasChanges, saveData }
}
