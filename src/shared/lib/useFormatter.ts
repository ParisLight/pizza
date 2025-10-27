export const useFormatter = () => {
  const numberFormat = (value: string): string => {
    if(!value) return ''
    return value && value.startsWith('8') ? `7${value.slice(1)}` : value
  }

  const normalizePhone = (phone: string): string => {
    if (!phone) return ''

    const clean = phone.replace(/\D/g, '')

    if (clean.startsWith('7')) {
      return '8' + clean.slice(1)
    }

    return clean
  }
  // todo: fix masks
  const digitalFormat = (value: string): string => {
    if(!value) return ''
    return value.replace(/\D/g, '')
  }

  return {numberFormat, digitalFormat, normalizePhone}
}