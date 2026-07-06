import { type IProduct } from "@/entities/product"

export type CartItem = {
  product: IProduct
  quantity: number
}
