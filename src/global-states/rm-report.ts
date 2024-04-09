import { useMutation } from '@tanstack/react-query'
import { showNotification } from '@mantine/notifications'

import { getErrorMessage } from '@utils/notification'
import { getRmReport } from '@actions/employees'

export const useRmReportData = () =>
  useMutation({
    mutationFn: getRmReport,
    onSuccess: (data: any) => {
      if (data?.statusCode) throw new Error(data.message)
    },
    onError: (err: typeof Error) => showNotification(getErrorMessage(err))
  })
