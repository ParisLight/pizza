export const numberFormat = (value: string): string => {
  if (!value) return ""
  return value && value.startsWith("8") ? `7${value.slice(1)}` : value
}

export const normalizePhone = (phone: string): string => {
  if (!phone) return ""

  const clean = phone.replace(/\D/g, "")

  if (clean.startsWith("7")) {
    return "8" + clean.slice(1)
  }

  return clean
}

export const digitalFormat = (value: string): string => {
  if (!value) return ""
  return value.replace(/\D/g, "")
}

export const localeDateFromISO = (str: string | undefined) => {
  if (!str) return ""

  return new Date(str).toLocaleDateString()
}
