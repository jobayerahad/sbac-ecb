import { useMutation } from '@tanstack/react-query'
import { showNotification } from '@mantine/notifications'

import { getErrorMessage } from '@utils/notification'
import { getRmReport } from '@actions/employees'

export const useRmReportData = () =>
  useMutation({
    mutationFn: getRmReport,
    onError: (err: typeof Error) => showNotification(getErrorMessage(err))
  })
