import { supabase } from '@/shared/api'
import { IUser } from '../model'

export const fetchUserById = async (userId: number) => {
  try {
    console.log(userId, 'user_id_get_')
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

export const updateUser = async (userId: number, userData: IUser) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('user_id', userId)
      .select()

    console.log({data, error}, 'get___')
    if (error) {
      console.error('Error updating user:', error)
      return null
    }
    console.log(data, 'data_get_')
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}