import { expect, test } from "vitest"
import { createDeliverySlots } from "./createDeliverySlots"
import type { TimeSlot } from "../model/types"

test("round current time to next interval", () => {
  const now = new Date(2026, 6, 18, 12, 10)
  const from = new Date(2026, 6, 18, 12, 30)
  const to = new Date(2026, 6, 18, 13, 0)

  const slots = createDeliverySlots({
    now,
    todayStartHour: 11,
    todayEndHour: 13,
    tomorrowStartHour: 11,
    tomorrowEndHour: 12,
    intervalMinutes: 30,
  })

  expect(slots[0]).toEqual<TimeSlot>({
    value: from.toISOString(),
    label: "12:30 - 13:00",
    from,
    to,
    isToday: true,
  })
})

test("start today slots from opening time when now is earlier", () => {
  const now = new Date(2026, 6, 18, 9, 0)
  const from = new Date(2026, 6, 18, 11, 0)
  const to = new Date(2026, 6, 18, 11, 30)

  const slots = createDeliverySlots({
    now,
    todayStartHour: 11,
    todayEndHour: 12,
    tomorrowStartHour: 11,
    tomorrowEndHour: 12,
    intervalMinutes: 30,
  })

  expect(slots[0]).toEqual<TimeSlot>({
    value: from.toISOString(),
    label: "11:00 - 11:30",
    from,
    to,
    isToday: true,
  })
})

test("create today and tomorrow slots within working hours", () => {
  const slots = createDeliverySlots({
    now: new Date(2026, 6, 18, 11, 0),
    todayStartHour: 11,
    todayEndHour: 12,
    tomorrowStartHour: 11,
    tomorrowEndHour: 12,
    intervalMinutes: 30,
  })

  expect(slots).toEqual<TimeSlot[]>([
    {
      value: new Date(2026, 6, 18, 11, 0).toISOString(),
      label: "11:00 - 11:30",
      from: new Date(2026, 6, 18, 11, 0),
      to: new Date(2026, 6, 18, 11, 30),
      isToday: true,
    },
    {
      value: new Date(2026, 6, 18, 11, 30).toISOString(),
      label: "11:30 - 12:00",
      from: new Date(2026, 6, 18, 11, 30),
      to: new Date(2026, 6, 18, 12, 0),
      isToday: true,
    },
    {
      value: new Date(2026, 6, 19, 11, 0).toISOString(),
      label: "Завтра · 11:00 - 11:30",
      from: new Date(2026, 6, 19, 11, 0),
      to: new Date(2026, 6, 19, 11, 30),
      isToday: false,
    },
    {
      value: new Date(2026, 6, 19, 11, 30).toISOString(),
      label: "Завтра · 11:30 - 12:00",
      from: new Date(2026, 6, 19, 11, 30),
      to: new Date(2026, 6, 19, 12, 0),
      isToday: false,
    },
  ])
})

test("create only tomorrow slots when today working hours are over", () => {
  const slots = createDeliverySlots({
    now: new Date(2026, 6, 18, 22, 0),
    todayStartHour: 11,
    todayEndHour: 21,
    tomorrowStartHour: 11,
    tomorrowEndHour: 12,
    intervalMinutes: 30,
  })

  expect(slots).toHaveLength(2)
  expect(slots.every((slot) => !slot.isToday)).toBe(true)
})
