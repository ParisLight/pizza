import { expect, test } from "vitest"
import { ref } from "vue"
import { useFormChanges } from "./useFormChanges"

test("hasChanges is false before saveData", () => {
  const form = ref({ name: "ann" })
  const { hasChanges } = useFormChanges(form)

  expect(hasChanges.value).toBe(false)
})

test("hasChanges is false after saveData with same values", () => {
  const form = ref({ name: "ann", age: 20 })
  const { hasChanges, saveData } = useFormChanges(form)

  saveData()

  expect(hasChanges.value).toBe(false)
})

test("hasChanges becomes true when current data differs from saved", () => {
  const form = ref({ name: "ann" })
  const { hasChanges, saveData } = useFormChanges(form)

  saveData()
  form.value = { name: "bob" }

  expect(hasChanges.value).toBe(true)
})

test("normalize is applied before comparison", () => {
  const form = ref({ name: " Ann ", phone: "8 953" })
  const { hasChanges, saveData } = useFormChanges(form, {
    normalize: (data) => ({
      name: data.name.trim(),
      phone: data.phone.replace(/\D/g, ""),
    }),
  })

  saveData()
  form.value = { name: "Ann", phone: "8953" }

  expect(hasChanges.value).toBe(false)
})
