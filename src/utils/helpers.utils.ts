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

export const capWords = (str: string, exceptions: string[] = []) => {
  const exceptionSet = new Set(exceptions.map((ex) => ex.toUpperCase()))

  return str
    ?.toLowerCase()
    .split(' ')
    .map((word) => {
      const upperWord = word.toUpperCase()
      return exceptionSet.has(upperWord) ? upperWord : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const formatDate = (date: Date | null) => dayjs(date).format('MM/DD/YYYY')
