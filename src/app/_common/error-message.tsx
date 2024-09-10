import { Alert } from '@mantine/core'
import { MdOutlineError as ErrorIcon } from 'react-icons/md'

type ErrorMsgProps = {
  error: {
    message?: string
    response?: {
      data?: {
        message?: string
      }
    }
  }
}

const ErrorMsg = ({ error }: ErrorMsgProps) => (
  <Alert color="red" icon={<ErrorIcon size={20} />} title={error?.message}>
    {error?.response?.data?.message}
  </Alert>
)

export default ErrorMsg
