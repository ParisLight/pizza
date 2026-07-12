import { ApiError, supabase } from "@/shared/api"
import type { IUser } from "../model/types"
import type { TelegramAuthResponse, UserDTO } from "@/entities/user/api/dto"
import { mappedUser, mapUserToInsert } from "../lib/mappers"

export const authWithTelegram = async (initData: string): Promise<IUser | null> => {
  const { data, error } = await supabase.functions.invoke<TelegramAuthResponse>("telegram-auth", {
    body: { initData },
  })

  if (error) {
    throw new ApiError(error.message, undefined, error)
  }

  if (!data?.user) return null

  return mappedUser(data.user)
}

export const updateUser = async (userId: number, userData: IUser): Promise<IUser | null> => {
  const updatingData = mapUserToInsert(userData)

  const { data: updatedUser, error } = await supabase
    .from("users")
    .update(updatingData)
    .eq("user_id", userId)
    .select()
    .single()

  if (error || !updatedUser) {
    return null
  }

  return mappedUser(updatedUser as UserDTO)
}
