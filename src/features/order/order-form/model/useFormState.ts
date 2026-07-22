import { useUserModel } from "@/entities/user"
import { type OrderFormValues } from "./types"
import { DeliveryType, PaymentType } from "@/entities/order"

export const useFormState = () => {
  const userModel = useUserModel()

  const getEmptyOrderForm = (): OrderFormValues => ({
    payerName: "",
    payerNumber: "",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    deliveryAddress: "",
    dontRingIntercom: false,
    floor: "",
    flat: "",
    orderComment: "",
    readyBy: null,
    deliveryTime: null,
  })

  const getFormValuesFromUserData = (): OrderFormValues => {
    const emptyForm = getEmptyOrderForm()

    if (!userModel.user) {
      return emptyForm
    }

    const user = userModel.user

    emptyForm.flat = user.flat ? String(user.flat) : ""
    emptyForm.floor = user.floor ? String(user.floor) : ""
    emptyForm.deliveryAddress = user.address
    emptyForm.payerName = user.name
    emptyForm.payerNumber = user.number

    return emptyForm
  }

  const form = reactive<OrderFormValues>(getFormValuesFromUserData())

  const prefillForm = () => {
    Object.assign(form, getFormValuesFromUserData())
  }

  return { form, prefillForm }
}
