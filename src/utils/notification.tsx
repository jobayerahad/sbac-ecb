import { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { BiCheckCircle as SuccessIcon } from 'react-icons/bi'
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md'

interface Message {
  title: string
  icon: ReactNode
  message: string
  color: string
}

interface ErrorResponse {
  message: string
}

export const getSuccessMessage = (message: string): Message => ({
  title: 'Success',
  icon: <SuccessIcon />,
  message,
  color: 'green'
})

export const getErrorMessage = (error: AxiosError<ErrorResponse>): Message => {
  const title = error?.message || 'Error'
  const errors = error?.response?.data
  const message = errors?.message || ''

  return {
    title,
    icon: <ErrorIcon />,
    message,
    color: 'red'
  }
}
