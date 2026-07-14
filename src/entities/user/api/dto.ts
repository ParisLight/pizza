import type { Database } from "@/shared/api"

export type UserDTO = Database["public"]["Tables"]["users"]["Row"]
export type UserInsertDTO = Database["public"]["Tables"]["users"]["Insert"]

export type TelegramAuthDTO = {
  user: UserDTO
  session: {
    access_token: string
    refresh_token: string
  }
}
