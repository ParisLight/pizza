import type { OrderFormValues } from './types';
import { useNow } from '@vueuse/core'
import { createDeliverySlots } from '@/entities/order'
import { PaymentType, DeliveryType, type TimeSlot } from '@/entities/order'
import { CURRENT_ORDER_FORM_RULES } from '../config/validation.ts';
import type { ComputedRef, Reactive } from 'vue'

export function useCurrentOrder(): {
  form: Reactive<OrderFormValues>
  deliverySlots: ComputedRef<TimeSlot[]>
  formRules: typeof CURRENT_ORDER_FORM_RULES
} {
  const createOrderFormValues = (): OrderFormValues => ({
    payerName: '',
    payerNumber: '',
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    deliveryAddress: '',
    dontRingIntercom: false,
    floor: '',
    flat: '',
    orderComment: '',
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

  return { form, deliverySlots, formRules }
}
