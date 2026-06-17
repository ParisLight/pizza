import type { Database, Tables } from "@/shared/api"

export type OrderDTO = Tables<"orders">
export type OrderInsertDTO = Database["public"]["Tables"]["orders"]["Insert"]

export type OrderLineDTO = Tables<"order_items">

export type OrderWithItemsDTO = OrderDTO & {
  order_items: OrderLineDTO[]
}

export type OrderItemsDTO = {
  product_id: number
  quantity: number
}
