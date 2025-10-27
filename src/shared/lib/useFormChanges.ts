import {cloneDeep, isEqual} from 'lodash';

export const useFormChanges = <T>(
  originalData: T,
  normalizers?: {
    [K in keyof T]?: (value: T[K]) => T[K]
  }
) => {
  const currentData = ref<T>(cloneDeep(originalData))

  const normalizeForComparison = (data: T) => {
    if(!data || !normalizers) return data

    const normalized = cloneDeep(data)

    Object.keys(normalizers).forEach(key => {
      const normalizer = normalizers[key as keyof T];
      if (normalizer && normalized[key as keyof T] !== undefined) {
        (normalized as any)[key] = normalizer(normalized[key as keyof T]);
      }
    });

    return normalized;
  }

  const hasChanges = computed(() => {
    const normalizedOriginal = normalizeForComparison(originalData);
    const normalizedCurrent = normalizeForComparison(currentData.value);

    return !isEqual(normalizedOriginal, normalizedCurrent)
  })

  const resetChanges = () => {
    currentData.value = cloneDeep(originalData)
  }

  const confirmChanges = () => {
    Object.assign(originalData, cloneDeep(currentData.value))
  }

  return {
    hasChanges,
    currentData,
    resetChanges,
    confirmChanges,
  }
}