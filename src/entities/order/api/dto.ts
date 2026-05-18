import type { Database } from "@/shared/api/supabase.types";

export type OrderDTO = Database['public']['Tables']['orders']['Row']
export type OrderInsertDTO = Database['public']['Tables']['orders']['Insert']
