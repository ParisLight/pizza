// todo: try to type this
export const validatePhone = (rule: any, value: any , callback: any) => {
  const cleanValue = value ? String(value).replace(/\D/g, "") : ""

  if (!cleanValue.startsWith("7") || cleanValue.length !== 11) {
    callback(new Error("Некорректный номер"))
    return
  }

  callback()
}
