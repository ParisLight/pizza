import { supabase } from "@/shared/api";
import type { IOrder } from "@/entities/order";
import { mapOrderToInsert } from "../lib/mappers.ts"

export const sendOrder = async (order: IOrder): Promise<null | number> => {
  const orderDTOData = mapOrderToInsert(order)

  const { data, error } = await supabase
    .from('orders')
    .insert(orderDTOData)
    .select('id')
    .single()

  if(!data || error) return null

  return data.id
}
