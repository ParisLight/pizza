export const useNotifications = () => {
  const notifyError = (message: string) => {
    ElNotification({ title: "Ошибка", message, type: "error" })
  }

  const notifySuccess = (message: string) => {
    ElNotification({ title: "Успех", message, type: "success" })
  }

  return { notifyError, notifySuccess }
}
