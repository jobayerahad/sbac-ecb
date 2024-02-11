import { useMutation } from '@tanstack/react-query'
import { showNotification } from '@mantine/notifications'

import clientAPI from '@utils/api'
import { getErrorMessage, getSuccessMessage } from '@utils/notification'
import { RmReportParams } from '@types'

const rmReport = async ({ token, params }: { token: string; params: RmReportParams }) => {
  const { data } = await clientAPI(token).get('/cbs/rm-report', { params })
  return data
}

export const useRmReportData = () =>
  useMutation({
    mutationFn: rmReport,
    onError: (err: typeof Error) => showNotification(getErrorMessage(err))
  })
