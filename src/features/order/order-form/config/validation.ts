import type { FormItemRule, FormRules } from "element-plus"
import type { OrderFormValues } from "@/features/order"
import { DeliveryType } from "@/entities/order"
import { validatePhone } from "@/shared/lib"

const requireWhen = (
  deliveryType: DeliveryType,
  message: string,
  trigger: FormItemRule["trigger"] = "change",
): FormItemRule => ({
  trigger,
  validator: (_rule, value, callback, source) => {
    if (source.deliveryType !== deliveryType) {
      callback()
      return
    }

    const isEmpty = value == null || (typeof value === "string" && !value.trim())

    if (isEmpty) {
      callback(new Error(message))
      return
    }

    callback()
  },
})

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
  deliveryAddress: requireWhen(DeliveryType.DELIVERY, "Укажите адрес доставки", "blur"),
  deliveryTime: requireWhen(DeliveryType.DELIVERY, "Выберите время доставки"),
  readyBy: requireWhen(DeliveryType.PICKUP, "Выберите время приготовления"),
  paymentType: {
    required: true,
    message: "Выберите способ оплаты",
    trigger: "change",
  },
  deliveryType: {
    required: true,
    message: "Выберите тип получения",
    trigger: "change",
  },
}
