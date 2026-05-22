import type { FormInstance, FormRules } from "element-plus";
import type { OrderFormValues } from "./types.ts";
import { validatePhone } from "@/shared/lib/formValidation";

export const useCurrentOrderValidation = (formRef: Ref<FormInstance | undefined>) => {
  const rules: FormRules<OrderFormValues> = {
    payerName: {
      required: true,
      message: 'Введите имя',
      trigger: 'blur',
      min: 2
    },
    payerNumber: {
      required: true,
      message: 'Введите номер',
      trigger: 'blur',
      validator: validatePhone
    },
    deliveryAddress: {
      required: true,
      message: 'Укажите адрес доставки',
      trigger: 'blur',
    }
  }

  const validateForm = async () => {
    if(!formRef.value) return false

    return await formRef.value.validate()
  }

  return { rules, validateForm }
}
