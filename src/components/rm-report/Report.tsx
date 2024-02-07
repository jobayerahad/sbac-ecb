'use client'

import { Paper, Table, Title } from '@mantine/core'
import { AccountInfo } from '@types'
import { amountFormatter } from '@utils/formatter.utils'
import { formatDateView } from '@utils/helpers.utils'

const RmReport = ({ data }: { data: AccountInfo[] }) => (
  <>
    <Paper shadow="xs" mt="md" p="sm">
      <Title order={4} ml="xs">
        Summary
      </Title>

      <Table verticalSpacing={4} horizontalSpacing={8} mt="xs">
        <tbody>
          <tr>
            <th>Employee No</th>
            <td>{data[0].empId}</td>
          </tr>

          <tr>
            <th>Employee Name</th>
            <td>{data[0].rmName}</td>
          </tr>

          <tr>
            <th>RM Code</th>
            <td>{data[0].rmId}</td>
          </tr>
        </tbody>
      </Table>
    </Paper>

    <Paper shadow="xs" my="md">
      <Table verticalSpacing={4} horizontalSpacing={8}>
        <thead>
          <tr>
            <th>Account No</th>
            <th>Account Name</th>
            <th>Product Nature</th>
            <th>Opening Date</th>
            <th>Status</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {data.map(({ accountno, accountName, glHead, openDate, status, balance }, index: number) => (
            <tr key={index}>
              <td>{accountno}</td>
              <td>{accountName}</td>
              <td>{glHead}</td>
              <td>{formatDateView(openDate)}</td>
              <td>{status}</td>
              <td>{amountFormatter(balance.toString())}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  </>
)

export default RmReport
