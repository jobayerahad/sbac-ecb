import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

export const capitalizeString = (str: string): string => {
  if (typeof str !== 'string') throw new TypeError('Expected a string')

  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const capWords = (str: string) => str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())

export const formatDate = (date: Date | null) => dayjs(date).format('MM/DD/YYYY')
export const formatDateView = (date: Date | null) => dayjs(date).format('Do MMM, YYYY')

export const sanitizeTableData = (data: Record<string, any>[] | null | undefined) => {
  if (!Array.isArray(data)) throw new Error('Expected an array of objects as input.')

  return (
    data?.map((row) => {
      const newRow: Record<string, any> = {}

      Object.keys(row).forEach((column) => {
        newRow[column] = typeof row[column] === 'number' ? row[column].toString() : row[column]
      })

      return newRow
    }) ?? []
  )
}
