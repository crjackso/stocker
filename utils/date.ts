import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

type DateKind = string | Dayjs | Date

export const parseDate = (
  timestamp: DateKind | number | undefined
) => {
  return timestamp ? dayjs(timestamp).utc() : undefined
}

export const toDate = (timestamp: DateKind | undefined) => {
  return parseDate(timestamp)?.toDate()
}

export const formatDate = (
  date: DateKind | number | undefined,
  format = 'M/D/YYYY',
  defaultValue = 'N/A'
): string => {
  return parseDate(date)?.format(format) || defaultValue
}

export const datesAreEqual = (
  date1: DateKind | undefined,
  date2: DateKind | undefined
) => {
  if (!date1 || !date2) return false

  return formatDate(date1) === formatDate(date2)
}

export const monthName = (date: DateKind): string => {
  return dayjs(date).format('MMMM')
}

export const monthNumber = (date: DateKind): number => {
  return dayjs(date).get('month')
}

export const getYear = (date: DateKind): number => {
  return dayjs(date).get('year')
}

export const currentDate = () => dayjs()

export const monthYearMatch = (value: DateKind | undefined, monthNumber: number, year?: number,): boolean => {
  const date = toDate(value)
  if (!date) return false

  return date.getMonth() === monthNumber && date.getFullYear() === year
}
