import { expect, test } from "vitest"
import { mappedProducts } from "./mappers"
import type { ProductDTO } from "../api/dto"
import type { IProduct } from "../model/types"

test("map dto products to domain", () => {
  expect(mappedProducts([])).toEqual([])

  const productsDTO: ProductDTO[] = [
    {
      id: 1,
      img: "/src/img/path",
      name: "Маргарита",
      weight: "450г",
      description: "Классическая пицца",
      price: 599,
      is_active: true,
      categoryId: 2,
      proteins: 12,
      fats: 10,
      carbs: 40,
      kcal: 300,
    },
  ]

  expect(mappedProducts(productsDTO)).toEqual<IProduct[]>([
    {
      id: 1,
      img: "/src/img/path",
      name: "Маргарита",
      weight: "450г",
      description: "Классическая пицца",
      price: 599,
      isActive: true,
      categoryId: 2,
      nutrition: {
        proteins: 12,
        fats: 10,
        carbs: 40,
        kcal: 300,
      },
    },
  ])
})

test("map products with null fields to defaults", () => {
  const productsDTO: ProductDTO[] = [
    {
      id: 1,
      img: null,
      name: null,
      weight: null,
      description: null,
      price: null,
      is_active: null,
      categoryId: null,
      proteins: null,
      fats: null,
      carbs: null,
      kcal: null,
    },
  ]

  expect(mappedProducts(productsDTO)).toEqual<IProduct[]>([
    {
      id: 1,
      img: null,
      name: "",
      weight: null,
      description: null,
      price: null,
      isActive: false,
      categoryId: 0,
      nutrition: {
        proteins: 0,
        fats: 0,
        carbs: 0,
        kcal: 0,
      },
    },
  ])
})
