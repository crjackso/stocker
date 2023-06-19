import dayjs from 'dayjs'

export const parseDate = (
  timestamp: string | dayjs.Dayjs | Date | number | undefined
) => {
  return timestamp ? dayjs(timestamp) : undefined
}

export const toDate = (timestamp: string | dayjs.Dayjs | Date | undefined) => {
  return parseDate(timestamp)?.toDate()
}

export const formatDate = (
  date: string | dayjs.Dayjs | Date | number | undefined,
  format = 'M/DD/YYYY'
) => {
  return parseDate(date)?.format(format)
}

export const datesAreEqual = (
  date1: string | dayjs.Dayjs | Date | undefined,
  date2: string | dayjs.Dayjs | Date | undefined
) => {
  if (!date1 || !date2) return false
  return parseDate(date1)?.unix() === parseDate(date2)?.unix()
}

export const monthName = (date: string | dayjs.Dayjs | Date) => {
  return dayjs(date).format('MMMM')
}

export const currentDate = () => dayjs()
