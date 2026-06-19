import { defineStore } from "pinia"
import type { IProduct } from "./types"
import { ProductApi } from "../index"
import { FETCH_PRODUCTS_LIMIT } from "../config"

type CatalogCategoryMeta = {
  page: number
  hasMore: boolean
}

export const useProductModel = defineStore("product", {
  state: () => ({
    products: {} as Record<number, IProduct>,
    categoryProducts: [] as Record<number, number[]>,
    catalogMeta: {} as Record<number, CatalogCategoryMeta>,
    loadingCategories: {} as Record<number, boolean>,
    searchQuery: "",
  }),
  actions: {
    async fetchProductsByPage(categoryId: number) {
      if (this.loadingCategories[categoryId]) return

      if (!this.catalogMeta[categoryId]) {
        this.catalogMeta[categoryId] = {
          page: 1,
          hasMore: true,
        }
      }

      const currentCatalog = this.catalogMeta[categoryId]

      if (!currentCatalog.hasMore) return

      this.loadingCategories[categoryId] = true

      const response = await ProductApi.fetchProducts(
        categoryId,
        currentCatalog.page,
        FETCH_PRODUCTS_LIMIT,
      )

      this.loadingCategories[categoryId] = false

      currentCatalog.hasMore = response.length === FETCH_PRODUCTS_LIMIT

      currentCatalog.page++

      response.forEach((product: IProduct) => {
        this.products[product.id] ??= product
      })

      this.categoryProducts[categoryId] ??= []

      const newIds = response.map((product: IProduct) => product.id)

      this.categoryProducts[categoryId].push(...newIds)
    },

    async ensureProductsByIds(ids: number[]) {
      const missing = ids.filter((id) => !this.products[id])

      if (!missing.length) return

      const response = await ProductApi.fetchProductsByProductIds(missing)

      response.forEach((product: IProduct) => {
        this.products[product.id] ??= product
      })
    },
  },
})
