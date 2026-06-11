import type { OrderFormValues } from "./types"
import { useNow } from "@vueuse/core"
import { createDeliverySlots, DeliveryType, PaymentType } from "@/entities/order"
import { CURRENT_ORDER_FORM_RULES } from "../config/validation.ts"
import type { FormInstance } from "element-plus"
import type { VNodeRef } from "vue"

export function useOrderForm() {
  const formRef = ref<FormInstance | undefined>()

  const setFormRef: VNodeRef = (el) => {
    formRef.value = (el as FormInstance | null) ?? undefined
  }

  const createOrderFormValues = (): OrderFormValues => ({
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

  const form = reactive<OrderFormValues>(createOrderFormValues())

  const now = useNow({
    interval: 1000 * 60,
  })

  const deliverySlots = computed(() => {
    return createDeliverySlots({
      now: now.value,
    })
  })

  const formRules = CURRENT_ORDER_FORM_RULES

  return { form, formRef, setFormRef, deliverySlots, formRules }
}
