import type { Database } from "@/shared/api/supabase.types";

export type CartDTO = Database['public']['Tables']['carts']
export type CartItemsDTO = Database['public']['Tables']['cart_items']['Row']
