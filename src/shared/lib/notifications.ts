export const notifyError = (message: string) => {
  ElNotification({ title: "Не вышло", message, type: "error" })
}

export const notifySuccess = (message: string) => {
  ElNotification({ title: "Готово", message, type: "success" })
}
