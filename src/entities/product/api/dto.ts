import type { Database } from "@/shared/api/supabase.types";

export type ProductDTO = Database['public']['Tables']['products']['Row']
