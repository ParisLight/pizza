import type { FormRules } from "element-plus";
import type { OrderFormValues } from "@/features/order";
import { validatePhone } from "@/shared/lib/formValidation";

export const CURRENT_ORDER_FORM_RULES: FormRules<OrderFormValues> = {
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
