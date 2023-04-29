import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const parseDate = (timestamp: string | dayjs.Dayjs | Date | undefined, utc = false) => {
  if (!timestamp) return undefined
  const date = dayjs(timestamp)
  return utc ? date.utc() : date
}

export const toDate = (timestamp: string | dayjs.Dayjs | Date | undefined) => {
  return parseDate(timestamp)?.toDate()
}

export const formatDate = (date: string | dayjs.Dayjs | Date | undefined, format = 'M/DD/YYYY') => {
  if (date) {
    return parseDate(date)?.format(format)
  }
}

export const currentDate = () => {
  return dayjs().utc()
}

export const datesAreEqual = (date1: string | dayjs.Dayjs | Date, date2: string | dayjs.Dayjs | Date) => {
  return parseDate(date1)?.unix() === parseDate(date2)?.unix()
}

export const monthName = (date: string | dayjs.Dayjs | Date) => {
  return dayjs(date).format('MMMM')
}
