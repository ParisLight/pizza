import { defineStore } from 'pinia'
import type { IProductModel, IProduct } from "./types";
import { ProductApi } from '../index'

export const useProductModel = defineStore('product', {
  state: () => <IProductModel>{
    products: new Map<number, IProduct>(),
    searchQuery: ''
  },
  actions: {
    async fetchAllProducts() {

      const productsResponse: IProduct[] = await ProductApi.fetchAllProducts()

      productsResponse.forEach((product: IProduct) => {
        if(!this.products.has(product.id)) {
          this.products.set(product.id, product)
        }
      })

    },
    getProductById(id: number): IProduct {
      return this.products.get(id)
    }
  },
  getters: {
    filteredProducts(): IProduct[] {
      if(!this.searchQuery) return this.products

      return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
})