import { defineStore } from 'pinia'
import type { IProduct } from "./types";
import { ProductApi } from '../index'

export const useProductModel = defineStore('product', {
  state: () => ({
    products: <Record<number, IProduct>> {},
    searchQuery: ''
  }),
  actions: {
    async fetchAllProducts() {

      const productsResponse: IProduct[] = await ProductApi.fetchAllProducts()

      productsResponse.forEach((product: IProduct) => {
        if(!this.products.hasOwnProperty(product.id)) {
          this.products[product.id] = product
        }
      })

    },
    getProductById(id: number): IProduct {
      return this.products[id]
    }
  }
})
