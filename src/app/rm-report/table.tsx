import { ToWords } from 'to-words'
import { Paper, Table, Text } from '@mantine/core'

import { AccountInfo } from '@types'
import { capWords } from '@utils/helpers.utils'

const toWords = new ToWords({ localeCode: 'en-BD' })

const RmTable = ({ data }: { data: AccountInfo[] }) => (
  <Paper shadow="xs" p="md" mt="md" mah="calc(100vh - 15rem)" style={{ overflowY: 'auto' }}>
    <Text size="sm">
      <strong>Employee ID:</strong> {data[0]?.empId}
    </Text>
    <Text size="sm">
      <strong>Employee Name:</strong> {data[0]?.rmName}
    </Text>
    <Text size="sm">
      <strong>RM ID:</strong> {data[0]?.rmId}
    </Text>

    <Table withTableBorder striped mt="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Account No</Table.Th>
          <Table.Th>Account Name</Table.Th>
          <Table.Th>Product Name</Table.Th>
          <Table.Th>Opening Date</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Balance</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data?.map(({ accountno, accountName, glHead, openDate, status, balance }, index) => (
          <Table.Tr key={index}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{accountno}</Table.Td>
            <Table.Td>{capWords(accountName)}</Table.Td>
            <Table.Td>{glHead}</Table.Td>
            <Table.Td>{new Date(openDate || '').toLocaleString('en-US', { dateStyle: 'long' })}</Table.Td>
            <Table.Td>{status.toLocaleLowerCase()}</Table.Td>
            <Table.Td>{balance?.toLocaleString('en-IN', { style: 'currency', currency: 'BDT' })}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

      <Table.Tfoot>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th colSpan={5}>
            {data
              .reduce((totalBalance, currentItem) => totalBalance + currentItem.balance, 0)
              .toLocaleString('en-IN', { style: 'currency', currency: 'BDT' })}
            <Text size="xs">
              (
              {toWords.convert(
                data.reduce((totalBalance, currentItem) => totalBalance + currentItem.balance, 0),
                { currency: true }
              )}
              )
            </Text>
          </Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  </Paper>
)

export default RmTable
