import { expect, test } from "vitest"
import { mappedCategories } from "./mappers"
import type { CategoryDTO } from "../api/dto"
import type { ICategory } from "../model"

test("map dto categories to domain", () => {
  expect(mappedCategories([])).toEqual({})

  const categoriesDTO: CategoryDTO[] = [
    {
      id: 1,
      icon: "/src/icon/path",
      name: "name_category",
    },
  ]

  expect(mappedCategories(categoriesDTO)).toEqual<Record<number, ICategory>>({
    1: {
      id: 1,
      icon: "/src/icon/path",
      name: "name_category",
    },
  })
})
