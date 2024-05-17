import type { Dayjs} from 'dayjs';
import dayjs from 'dayjs'

type DateKind = string | Dayjs | Date

export const parseDate = (
  timestamp: DateKind | number | undefined
) => {
  return timestamp ? dayjs(timestamp) : undefined
}

export const toDate = (timestamp: DateKind | undefined) => {
  return parseDate(timestamp)?.toDate()
}

export const formatDate = (
  date: DateKind | number | undefined,
  format = 'M/DD/YYYY'
) => {
  return parseDate(date)?.format(format)
}

export const datesAreEqual = (
  date1: DateKind | undefined,
  date2: DateKind | undefined
) => {
  if (!date1 || !date2) return false
  return parseDate(date1)?.unix() === parseDate(date2)?.unix()
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
