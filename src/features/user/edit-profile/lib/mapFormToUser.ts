import type { UserProfileForm } from "../model"
import type { IUser } from "@/entities/user"

export const mapFormToUser = (form: UserProfileForm, user: IUser): IUser => ({
  ...user,
  name: form.name,
  number: form.number,
  address: form.address,
  floor: form.floor ? Number(form.floor) : null,
  flat: form.flat ? Number(form.flat) : null,
})
