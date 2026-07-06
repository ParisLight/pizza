export const notifyError = (message: string) => {
  ElNotification({ title: "Ошибка", message, type: "error" })
}

export const notifySuccess = (message: string) => {
  ElNotification({ title: "Успех", message, type: "success" })
}
