import type { IUser } from "@/entities/user"
import type { UserProfileForm } from "../model"

export const mapUserToForm = (userData: IUser): UserProfileForm => {
  return {
    address: userData.address,
    floor: userData.floor ? String(userData.floor) : "",
    number: userData.number,
    flat: userData.flat ? String(userData.flat) : "",
    name: userData.name,
  }
}
