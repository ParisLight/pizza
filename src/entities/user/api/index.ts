import { supabase } from '@/shared/api'
import type { IUser } from "../model/types"
import type { UserDTO } from "@/entities/user/api/dto";
import { mappedUser, mapUserToInsert } from "../lib/mappers"


export const fetchUserById = async (userId: number): Promise<IUser | null> => {
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single()

  if(error || !userData) return null

  return mappedUser(userData as UserDTO)
}

export const updateUser = async (userId: number, userData: IUser): Promise<IUser | null> => {
  const updatingData = mapUserToInsert(userData)

  const { data: updatedUser, error } = await supabase
    .from('users')
    .update(updatingData)
    .eq('user_id', userId)
    .select()
    .single()

  if (error || !updatedUser) {
    return null
  }

  return mappedUser(updatedUser as UserDTO)
}
