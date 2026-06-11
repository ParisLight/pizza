import type { FormRules } from "element-plus"
import type { UserProfileForm } from "../model/types"
import { validatePhone } from "@/shared/lib"

export const EDIT_PROFILE_FORM_RULES: FormRules<UserProfileForm> = {
  name: {
    required: true,
    message: "Введите имя",
    trigger: "blur",
    min: 2,
  },
  number: {
    required: true,
    message: "Введите номер",
    trigger: "blur",
    validator: validatePhone,
  },
}
