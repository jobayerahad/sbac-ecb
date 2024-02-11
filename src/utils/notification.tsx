import { BiCheckCircle as SuccessIcon } from 'react-icons/bi'
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md'

export const getSuccessMessage = (message: string) => ({
  title: 'Success',
  icon: <SuccessIcon />,
  message,
  color: 'green'
})

export const getErrorMessage = (error: any) => {
  if (typeof error === 'string')
    return {
      title: 'Error',
      icon: <ErrorIcon />,
      message: error,
      color: 'red'
    }

  const { response } = error
  const { data } = response || {}
  const { error: title = 'Error', message: errors } = data || {}

  const message = typeof errors === 'string' ? errors : errors?.length > 0 ? errors.join('; ') : error?.message

  return {
    title,
    icon: <ErrorIcon />,
    message,
    color: 'red'
  }
}
