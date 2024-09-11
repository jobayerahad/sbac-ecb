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
