import { defineStore } from "pinia"
import type { CatalogCategoryMeta, IProduct } from "./types"
import { ProductApi } from "../index"
import { FETCH_PRODUCTS_LIMIT } from "../config"
import { type PaginatedStatus } from "@/shared/config"
import { useAsyncPaginatedStatus } from "@/shared/lib"

export const useProductModel = defineStore("product", {
  state: () => ({
    products: {} as Record<number, IProduct>,

    categoryProducts: [] as Record<number, number[]>,
    catalogMeta: {} as Record<number, CatalogCategoryMeta>,

    categoryStatus: {} as Record<number, PaginatedStatus>,

    searchQuery: "",
  }),
  getters: {
    getCategoryStatus:
      (state) =>
      (categoryId: number): PaginatedStatus => {
        return state.categoryStatus?.[categoryId] ?? "idle"
      },
  },
  actions: {
    async fetchProductsByPage(categoryId: number) {
      const { startFetch, finishFetch, canFetch } = useAsyncPaginatedStatus()

      const status = this.categoryStatus[categoryId] ?? "idle"
      const hasData = !!this.categoryProducts?.[categoryId]?.length
      const hasMore = this.catalogMeta[categoryId]?.hasMore ?? true
      console.log({ hasMore }, "has_more_")
      if (!canFetch(status, hasMore)) return

      const isFirstLoad = !hasData

      this.categoryStatus[categoryId] = startFetch(status, hasData)

      try {
        this.catalogMeta[categoryId] ??= { page: 1, hasMore: true }

        const currentCatalog = this.catalogMeta[categoryId]

        const response = await ProductApi.fetchProducts(
          categoryId,
          currentCatalog.page,
          FETCH_PRODUCTS_LIMIT,
        )

        currentCatalog.hasMore = response.length === FETCH_PRODUCTS_LIMIT
        currentCatalog.page++

        response.forEach((product: IProduct) => {
          this.products[product.id] ??= product
        })

        this.categoryProducts[categoryId] ??= []
        this.categoryProducts[categoryId].push(...response.map((product: IProduct) => product.id))

        this.categoryStatus[categoryId] = finishFetch(response.length, isFirstLoad)
      } catch {
        this.categoryStatus[categoryId] = "error"
      }
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
