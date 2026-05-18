import type { Database } from "@/shared/api/supabase.types";

export type UserDTO = Database['public']['Tables']['users']['Row']
export type UserInsertDTO = Database['public']['Tables']['users']['Insert']
