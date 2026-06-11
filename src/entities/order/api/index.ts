import { supabase } from "@/shared/api"
import type { IOrder } from "../model"
import { mapOrderToInsert, mappedOrder } from "../lib/mappers.ts"

export const sendOrder = async (order: IOrder): Promise<null | number> => {
  const orderDTOData = mapOrderToInsert(order)

  const { data, error } = await supabase.from("orders").insert(orderDTOData).select("id").single()

  if (!data || error) return null

  return data.id
}

export const fetchOrders = async (userId: number): Promise<IOrder[] | null> => {
  if (!userId) return null

  const { data, error } = await supabase.from("orders").select("*").eq("user_id", userId)

  if (error) return null

  return data.map((order) => mappedOrder(order))
}
