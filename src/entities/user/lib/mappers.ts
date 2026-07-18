import type { UserDTO, UserInsertDTO } from "../api/dto"
import type { IUser } from "../model/types.ts"

export const mappedUser = (userData: UserDTO): IUser => ({
  id: userData.id,
  name: userData.name,
  userId: userData.user_id,
  username: userData.username ?? "",
  number: userData.number ?? "",
  address: userData.address ?? "",
  flat: userData.flat,
  floor: userData.floor,
})

export const mapUserToInsert = (userData: IUser): UserInsertDTO => ({
  name: userData.name,
  user_id: userData.userId,
  username: userData.username || null,
  number: userData.number || null,
  address: userData.address || null,
  flat: userData.flat,
  floor: userData.floor,
})
