import { expect, test } from "vitest"
import { digitalFormat, localeDateFromISO, normalizePhone, numberFormat } from "./formatters"

test("replace first number on 7", () => {
  expect(numberFormat("8952831412")).toBe("7952831412")
  expect(numberFormat("")).toBe("")
})

test("delete not digits from", () => {
  expect(digitalFormat("asdjh2461jhkh56")).toBe("246156")
  expect(digitalFormat("")).toBe("")
})

test("normalize phone function", () => {
  expect(normalizePhone("+79532831412")).toBe("89532831412")
  expect(normalizePhone("string +79532831412")).toBe("89532831412")
  expect(normalizePhone("")).toBe("")
})

test("locale date from iso", () => {
  const isoDate = new Date().toISOString()
  const localeDate = new Date(isoDate).toLocaleDateString()

  expect(localeDateFromISO(isoDate)).toBe(localeDate)
  expect(localeDateFromISO("")).toBe("")
})
