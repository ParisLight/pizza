import type { OrderFormValues } from './types';
import { createDeliverySlots } from '@/entities/order/lib/createDeliverySlots.ts'
import { useNow } from '@vueuse/core'
import { PaymentType, DeliveryType } from '@/entities/order'
import { CURRENT_ORDER_FORM_RULES } from '../config/validation.ts';

export const useCurrentOrder = () => {
  const createOrderFormValues = (): OrderFormValues => ({
    payerName: "",
    payerNumber: "",
    deliveryType: DeliveryType.DELIVERY,
    paymentType: PaymentType.CARD,
    deliveryAddress: '',
    dontRingIntercom: false,
    floor: '',
    flat: '',
    deliveryTime: '',
    orderComment: ''
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
