import { ApiError, supabase } from "@/shared/api"
import type { IOrder, IOrderDraft, IOrderItemInput } from "../model"
import type { OrderWithItemsDTO } from "./dto"
import { mapOrderDraftToInsert, mapOrderItemsToOrderItemsDTO, mappedOrder } from "../lib/mappers"

export const sendOrder = async (
  order: IOrderDraft,
  items: IOrderItemInput[],
): Promise<null | number> => {
  const orderDTOData = mapOrderDraftToInsert(order)
  const orderItemsDTOData = mapOrderItemsToOrderItemsDTO(items)

  const { data: orderId, error } = await supabase.rpc("create_order", {
    order_data: orderDTOData,
    items_data: orderItemsDTOData,
  })

  if (error) {
    throw new ApiError("Error send order", error.code, error)
  }

  if (!orderId) return null

  return orderId
}

export const fetchOrders = async (userId: number): Promise<IOrder[] | null> => {
  if (!userId) return null

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items (*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .overrideTypes<OrderWithItemsDTO[], { merge: false }>()

  if (error) {
    throw new ApiError("Error fetching orders", error.code, error)
  }

  if (!data) return null

  return data.map((order) => mappedOrder(order))
}
