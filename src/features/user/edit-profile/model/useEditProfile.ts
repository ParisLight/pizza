import { useEditForm } from "@/features/user/edit-profile/model/useEditForm.ts"
import { useSaveProfile } from "@/features/user/edit-profile/model/useSaveProfile.ts"
import type { FormInstance } from "element-plus"

export const useEditProfile = (formRef: Ref<FormInstance | undefined>) => {
  const { form, formRules, hasChanges, saveData } = useEditForm()

  const { isSavingProfile, saveProfile } = useSaveProfile({
    formRef,
    formData: form,
    saveFormData: saveData,
    hasChanges: hasChanges,
  })

  return { form, formRules, hasChanges, isSavingProfile, saveProfile }
}
