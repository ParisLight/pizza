import type { OrderFormValues } from './types';
import { createOrderFormValues } from './createOrderFormValues'
import { createDeliverySlots } from '@/entities/order/lib/createDeliverySlots.ts'
import { useNow } from '@vueuse/core'

export const useCurrentOrder = () => {
  const form = reactive<OrderFormValues>(createOrderFormValues())

  const now = useNow({
    interval: 1000 * 60,
  })

  const deliverySlots = computed(() => {
    return createDeliverySlots({
      now: now.value,
    })
  })

  return { form, deliverySlots }
}
