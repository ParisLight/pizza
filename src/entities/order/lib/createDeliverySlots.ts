import type { TimeSlot } from "../model/types"

interface CreateDeliverySlotsParams {
  now?: Date

  todayStartHour?: number
  todayEndHour?: number

  tomorrowStartHour?: number
  tomorrowEndHour?: number

  intervalMinutes?: number
}

const roundToNextInterval = (date: Date, intervalMinutes: number): Date => {
  const result = new Date(date)

  result.setSeconds(0)
  result.setMilliseconds(0)

  const minutes = result.getMinutes()
  const remainder = minutes % intervalMinutes

  if (remainder !== 0) {
    result.setMinutes(minutes + intervalMinutes - remainder)
  }

  return result
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const createDeliverySlots = ({
  now = new Date(),

  todayStartHour = 11,
  todayEndHour = 21,

  tomorrowStartHour = 11,
  tomorrowEndHour = 21,

  intervalMinutes = 30,
}: CreateDeliverySlotsParams = {}): TimeSlot[] => {
  const slots: TimeSlot[] = []

  const currentDate = new Date(now)

  // TODAY

  const todayStart = new Date(currentDate)
  todayStart.setHours(todayStartHour, 0, 0, 0)

  const todayEnd = new Date(currentDate)
  todayEnd.setHours(todayEndHour, 0, 0, 0)

  let currentTodaySlot = roundToNextInterval(
    currentDate > todayStart ? currentDate : todayStart,
    intervalMinutes,
  )

  while (currentTodaySlot < todayEnd) {
    const from = new Date(currentTodaySlot)

    const to = new Date(currentTodaySlot)
    to.setMinutes(to.getMinutes() + intervalMinutes)

    if (to > todayEnd) {
      break
    }

    slots.push({
      value: from.toISOString(),

      label: `${formatTime(from)} - ${formatTime(to)}`,

      from,
      to,

      isToday: true,
    })

    currentTodaySlot = to
  }

  // TOMORROW

  const tomorrow = new Date(currentDate)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const tomorrowStart = new Date(tomorrow)
  tomorrowStart.setHours(tomorrowStartHour, 0, 0, 0)

  const tomorrowEnd = new Date(tomorrow)
  tomorrowEnd.setHours(tomorrowEndHour, 0, 0, 0)

  let currentTomorrowSlot = new Date(tomorrowStart)

  while (currentTomorrowSlot < tomorrowEnd) {
    const from = new Date(currentTomorrowSlot)

    const to = new Date(currentTomorrowSlot)
    to.setMinutes(to.getMinutes() + intervalMinutes)

    if (to > tomorrowEnd) {
      break
    }

    slots.push({
      value: from.toISOString(),

      label: `Завтра · ${formatTime(from)} - ${formatTime(to)}`,

      from,
      to,

      isToday: false,
    })

    currentTomorrowSlot = to
  }
  console.log({ slots }, "get_slots___")
  return slots
}
