import ProductCard from './ui/ProductCard.vue'

export type { IProduct, INutrition } from './model/types'
export { useProductModel } from "./model";
export { mappedProducts } from "./lib";
export { ProductCard }
export * as ProductApi from './api'