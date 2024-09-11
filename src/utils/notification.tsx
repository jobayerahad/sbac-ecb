import { BiCheckCircle as SuccessIcon } from 'react-icons/bi'
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md'

import { StatusMsg } from '@config/strings'
import { Message } from '@types'

type Props = {
  status: StatusMsg
  message: string
}

export const getMessage = (obj: Props): Message => ({
  title: obj.status,
  icon: obj.status === StatusMsg.SUCCESS ? <SuccessIcon /> : <ErrorIcon />,
  message: obj.message,
  color: obj.status === StatusMsg.SUCCESS ? 'green' : 'red'
})
