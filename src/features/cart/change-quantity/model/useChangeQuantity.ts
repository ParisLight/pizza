import { useCartModel } from '@/entities/cart'
import { useDebounceFn } from '@vueuse/core'
import type { IProduct } from '@/entities/product'
import type { Ref } from 'vue'

export const useChangeQuantity = (product: Ref<IProduct>) => {
  const cartModel = useCartModel()

  const debouncedSyncCart = useDebounceFn(() => {
    return cartModel.syncCart()
  }, 300)

  const quantity = computed(() => {
    const item = cartModel.items.find(i => i.productId === product.value.id)
    return item?.quantity ?? 0
  })

  const isInCart = computed(() => quantity.value > 0)


  const add = async () => {
    cartModel.addToCart(product.value.id)
    await debouncedSyncCart()
  }

  const remove = async () => {
    cartModel.removeFromCart(product.value.id)
    await debouncedSyncCart()
  }

  return {
    quantity,
    isInCart,
    add,
    remove,
  }
}
