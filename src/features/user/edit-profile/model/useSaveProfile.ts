import type { UserProfileForm } from "./types.ts"
import { mapFormToUser } from "@/features/user/edit-profile/lib"
import { useUserModel } from "@/entities/user"
import type { FormInstance } from "element-plus"

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
      isSavingProfile.value = true

      await formRef.value.validate()

      const updatingUserData = mapFormToUser(toValue(formData), userModel.user)

      const isUpdated = await userModel.updateUser(updatingUserData)

      if (!isUpdated) {
        ElNotification({
          title: "Ошибка",
          message: "Что-то пошло не так",
          type: "error",
        })
        return
      }

      ElNotification({
        title: "Успешно",
        message: "Информация сохранена",
        type: "success",
      })

      saveFormData()
    } catch (e) {
      ElNotification({
        title: "Ошибка",
        message: "Что-то пошло не так",
        type: "error",
      })
    } finally {
      isSavingProfile.value = false
    }
  }

  return { isSavingProfile, saveProfile }
}
