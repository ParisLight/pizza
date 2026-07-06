import type { UserProfileForm } from "./types.ts"
import { mapFormToUser } from "@/features/user/edit-profile/lib"
import { useUserModel } from "@/entities/user"
import type { FormInstance } from "element-plus"
import { notifyError, notifySuccess } from "@/shared/lib"

interface Params {
  formData: MaybeRefOrGetter<UserProfileForm>
  formRef: Ref<FormInstance | undefined>
  hasChanges: Ref<boolean>
  saveFormData: () => void
}

export const useSaveProfile = ({ formRef, formData, hasChanges, saveFormData }: Params) => {
  const userModel = useUserModel()

  const isSavingProfile = ref(false)

  const saveProfile = async () => {
    if (!hasChanges.value) return

    if (!userModel.user) return

    if (!formRef.value) return

    try {
      await formRef.value.validate()
    } catch {
      notifyError("Проверьте правильность заполненных полей")
      return
    }

    isSavingProfile.value = true

    try {
      const updatingUserData = mapFormToUser(toValue(formData), userModel.user)

      const isUpdated = await userModel.updateUser(updatingUserData)

      if (!isUpdated) {
        notifyError("Не удалось сохранить данные. Попробуйте позже")
        return
      }

      notifySuccess("Информация сохранена")

      saveFormData()
    } catch {
      notifyError("Что-то пошло не так")
    } finally {
      isSavingProfile.value = false
    }
  }

  return { isSavingProfile, saveProfile }
}
