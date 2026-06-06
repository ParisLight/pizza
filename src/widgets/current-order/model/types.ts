import type { FormValidationResult } from "element-plus"

export type CurrentOrderExpose = {
  validateForm: () => undefined | FormValidationResult
}
