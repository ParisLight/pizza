import { useUserModel, type IUser } from "@/entities/user"
import { useFormatter, useFormChanges } from "@/shared/lib"
import { h } from "vue"
import { type FormRules, type FormInstance, ElNotification } from "element-plus"
import { validatePhone } from "@/shared/lib/formValidation";

export const useUserProfileForm = () => {
  const { user, updateUser } = useUserModel()

  const isSendingForm = ref(false)

  const { normalizePhone } = useFormatter()

  const { hasChanges, currentData } = useFormChanges(user, {
    number: (value: string) => normalizePhone(value),
  })

  const profileFormRules = reactive<FormRules<IUser>>({
    name: [
      {
        required: true,
        min: 1,
        message: "Поле обязательно для заполнения",
        trigger: "blur",
      },
    ],
    number: [
      {
        required: true,
        validator: validatePhone,
        trigger: "blur",
      },
    ],
  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    isSendingForm.value = true

    if (!formEl) {
      isSendingForm.value = false
      return
    }

    const valid = await formEl.validate()
    console.log(valid, 'get_valid___')
    if (valid && user && currentData.value) {
      const output = await updateUser(user.userId, currentData.value)
      console.log(output)
    } else {
      ElNotification({
        title: "Ошибка",

        message: h(
          "span",
          { style: "color: var(--el-color-danger)" },
          "Проверьте правильность заполненных данных",
        ),
      })
      console.log("error submit!")
    }

    console.log(currentData, "current_data_")

    isSendingForm.value = false
  }

  return {
    profileFormRules,
    submitForm,
    hasChanges,
    currentData,
    isSendingForm,
  }
}
