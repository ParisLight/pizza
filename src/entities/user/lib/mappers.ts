import type { UserDTO, UserInsertDTO } from "@/entities/user/api/dto";
import type { IUser } from "@/entities/user";

export const mappedUser = (userData: UserDTO): IUser  => {
  return {
    ...userData,
    address: !userData.address ? '' : userData.address,
    username: !userData.username ? '' : userData.username,
    number: !userData.number ? '' : userData.number
  }
}

export const mapUserToInsert = (userData: IUser): UserInsertDTO => {
  return {
    ...userData,
    flat: !userData.flat ? null : Number(userData.flat),
    address: !userData.address ? null : userData.address,
    username: !userData.username ? null : userData.username,
    floor: !userData.floor ? null : Number(userData.floor),
    number: !userData.number ? null : userData.number
  }
}
