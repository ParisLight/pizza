import { useUserModel, IUser } from "@/entities/user";
import { useFormatter, useFormChanges } from '@/shared/lib'
import { h } from "vue"
import type { FormRules, FormInstance, ElNotification } from "element-plus"

export const useUserProfileForm = () => {
  const userModel = useUserModel()

  const isSendingForm = ref(false)

  const { normalizePhone } = useFormatter()

  const { hasChanges, currentData } = useFormChanges(userModel.user, {
    number: (value: string) => normalizePhone(value)
  })

  const validateNumber = (rule: any, value: any, callback: any) => {
    const cleanValue = value ? value.replace(/\D/g, '') : ''

    if(!cleanValue.startsWith('7') || cleanValue.length !== 11) {
      callback(new Error('Некорректный номер'))
    } else {
      callback()
    }
  }

  const profileFormRules = reactive<FormRules<IUser>>({
    name: [
      {
        required: true,
        min: 1,
        message: 'Поле обязательно для заполнения',
        trigger: 'blur'
      }
    ],
    number: [
      {
        required: true,
        validator: validateNumber,
        trigger: 'blur'
      },
    ]
  })

  const submitForm = (formEl: FormInstance | undefined) => {
    isSendingForm.value = true

    if (!formEl) {
      isSendingForm.value = false
      return
    }

    formEl.validate(async (valid) => {
      if (valid) {
        const output = await userModel.updateUser(userModel.user.user_id, currentData.value)
        console.log(output)
      } else {
        ElNotification({
          title: 'Ошибка',

          message: h('span', { style: 'color: var(--el-color-danger)' }, 'Проверьте правильность заполненных данных')
        })
        console.log('error submit!')
      }

      console.log(currentData, 'current_data_')
    })

    isSendingForm.value = false
  }

  return {
    profileFormRules,
    submitForm,
    hasChanges,
    currentData,
    isSendingForm
  }
}