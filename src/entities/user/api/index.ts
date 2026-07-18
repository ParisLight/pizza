import { ApiError, supabase } from "@/shared/api"
import type { IUser } from "../model/types.ts"
import type { TelegramAuthDTO, UserDTO } from "@/entities/user/api/dto"
import { mappedUser, mapUserToInsert } from "../lib/mappers"

export const authWithTelegram = async (initData: string): Promise<IUser | null> => {
  const { data, error } = await supabase.functions.invoke<TelegramAuthDTO>("telegram-auth", {
    body: { initData },
  })

  if (error) {
    throw new ApiError(error.message, undefined, error)
  }

  if (!data?.user) return null

  if (!data?.session) {
    throw new Error("Session not found")
  }

  await supabase.auth.setSession({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  })

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

  if (error) {
    throw new ApiError("Error updating user", error.code, error)
  }

  if (!updatedUser) {
    return null
  }

  return mappedUser(updatedUser as UserDTO)
}
