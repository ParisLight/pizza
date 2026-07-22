import type { FormItemRule } from "element-plus"

export const validatePhone: NonNullable<FormItemRule["validator"]> = (_rule, value, callback) => {
  const cleanValue = value ? String(value).replace(/\D/g, "") : ""

  if (!cleanValue.startsWith("7") || cleanValue.length !== 11) {
    callback(new Error("Некорректный номер"))
    return
  }

  callback()
}
