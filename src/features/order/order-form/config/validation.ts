import type { FormRules } from "element-plus"
import type { OrderFormValues } from "@/features/order"
import { DeliveryType } from "@/entities/order"
import { validatePhone } from "@/shared/lib/formValidation"

export const CURRENT_ORDER_FORM_RULES: FormRules<OrderFormValues> = {
  payerName: {
    required: true,
    message: "Введите имя",
    trigger: "blur",
    min: 2,
  },
  payerNumber: {
    required: true,
    message: "Введите номер",
    trigger: "blur",
    validator: validatePhone,
  },
  deliveryAddress: {
    trigger: "blur",
    validator: (_, value, callback, source) => {
      if (source.deliveryType === DeliveryType.PICKUP) {
        callback()
        return
      }

      if (!value.trim()) {
        callback(new Error("Укажите адрес доставки"))
        return
      }

      callback()
    },
  },
}
