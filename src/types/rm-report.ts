export type RmReportParams = {
  emp_id: number
  start_date: string
  end_date: string
}

export type RmReportProps = {
  empId: number | undefined
  startDate: Date | null
  endDate: Date | null
}

export type AccountInfo = {
  rmId: number
  rmName: string
  empId: string
  accountno: string
  glHead: string
  accountName: string
  openDate: Date | null
  balance: number
  status: string
}
