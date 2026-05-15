export const useConfirmationCompletelyDelete = () => {
  const visibleDeleteStates = ref<Record<number, boolean>>({});

  const toggleDeleteVisibility = (productId: number) => {
    visibleDeleteStates.value[productId] = !visibleDeleteStates.value[productId];
  };

  const isDeleteVisible = (productId: number) => {
    return !!visibleDeleteStates.value?.[productId]
  }

  return { visibleDeleteStates, toggleDeleteVisibility, isDeleteVisible }
}
