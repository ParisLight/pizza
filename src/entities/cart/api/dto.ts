import type { Database } from "@/shared/api/supabase.types";

export type CartDTO = Database['public']['Tables']['carts']['Row']

export type CartItemsDTO = Database['public']['Tables']['cart_items']['Row']
export type CartItemsInsertDTO = Database['public']['Tables']['cart_items']['Insert']
