import type { Database, Tables } from "@/shared/api"

export type OrderDTO = Tables<"orders">
export type OrderInsertDTO = Database["public"]["Tables"]["orders"]["Insert"]
