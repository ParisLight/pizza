import { type MaybeRefOrGetter, toValue } from "vue"
import isEqual from "fast-deep-equal"

type UseFormChangesOptions<T> = {
  normalize?: (data: T) => T
}

export const useFormChanges = <T extends object>(
  currentData: MaybeRefOrGetter<T>,
  options?: UseFormChangesOptions<T>,
) => {
  const normalize = (value: T): T =>
    options?.normalize
      ? options.normalize(JSON.parse(JSON.stringify(value)))
      : JSON.parse(JSON.stringify(value))

  const savedData = ref<T>()

  const saveData = () => {
    savedData.value = normalize(toValue(currentData))
  }

  const hasChanges = computed(() => {
    if (!savedData.value) {
      return false
    }

    return !isEqual(savedData.value, normalize(toValue(currentData)))
  })

  return {
    hasChanges,
    saveData,
  }
}
