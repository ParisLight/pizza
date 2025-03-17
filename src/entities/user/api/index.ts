import { supabase } from '@/shared/api'

export const fetchUserByTgId = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)

    if(error) return []

    return data
  } catch (error) {
    console.log(error, 'user_')
  }
}