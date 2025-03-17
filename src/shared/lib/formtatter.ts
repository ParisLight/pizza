export const numberFormat = (value: string): string => {
  if(!value) return ''
  return value && value.startsWith('8') ? `7${value.slice(1)}` : value
}

export const digitalFormat = (value: string): string => {
  if(!value) return ''
  return value.replace(/\D/g, '')
}
