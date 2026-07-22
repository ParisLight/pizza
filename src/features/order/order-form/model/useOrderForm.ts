import { useNow } from "@vueuse/core"
import { useFormState } from "./useFormState.ts"
import { createDeliverySlots } from "@/entities/order"
import { CURRENT_ORDER_FORM_RULES } from "../config/validation.ts"
import type { FormInstance } from "element-plus"
import type { VNodeRef } from "vue"

export function useOrderForm() {
  const formRef = ref<FormInstance | undefined>()

  const { form, prefillForm } = useFormState()

  const setFormRef: VNodeRef = (el) => {
    formRef.value = (el as FormInstance | null) ?? undefined
  }

  const now = useNow({
    interval: 1000 * 60,
  })

  const deliverySlots = computed(() => {
    return createDeliverySlots({
      now: now.value,
    })
  })

  const formRules = CURRENT_ORDER_FORM_RULES

  return { form, formRef, setFormRef, prefillForm, deliverySlots, formRules }
}
