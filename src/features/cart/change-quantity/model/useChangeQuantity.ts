import { computed } from 'vue'
import { useCartModel } from '@/entities/cart'
import type { IProduct } from '@/entities/product'

export const useChangeQuantity = (product: IProduct) => {
  const cartModel = useCartModel()

  const quantity = computed(() => {
    const item = cartModel.items.find(i => i.product_id === product.id)
    return item?.quantity ?? 0
  })

  const add = async () => {
    await cartModel.addToCart(product.id)
  }

  const remove = async () => {
    await cartModel.removeFromCart(product.id)
  }

  const isInCart = computed(() => quantity.value > 0)

  return {
    quantity,
    add,
    remove,
    isInCart,
  }
}