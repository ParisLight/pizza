import type { Database } from "@/shared/api/supabase.types";

export type CategoryDTO = Database['public']['Tables']['categories']['Row']
