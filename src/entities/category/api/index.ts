import { supabase } from '@/shared/api'
import type { ICategory } from "@/entities/category"
import type { CategoryDTO } from "@/entities/category/api/dto";
import { mappedCategories } from "../lib/mappers"

export const fetchCategories = async (): Promise<Record<number, ICategory>> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')

  if(!data || error) return []


  return mappedCategories(data as CategoryDTO[])
}
