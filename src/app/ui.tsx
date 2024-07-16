'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Alert,
  Avatar,
  Container,
  Group,
  Pagination,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'

import { MdLocalPhone as PhoneIcon, MdPermIdentity as IdIcon, MdAlternateEmail as EmailIcon } from 'react-icons/md'
import { FaMobileAlt as MobileIcon } from 'react-icons/fa'
import { IoSearch as SearchIcon } from 'react-icons/io5'
import { MdErrorOutline as ErrorIcon } from 'react-icons/md'

import useNavigation from '@hooks/useNavigation'
import { capWords } from '@utils/helpers.utils'
import { TEmployee, TPaginatedRes } from '@types'

type Props = {
  locations: any
  data: TPaginatedRes<TEmployee>
}

const ContactBookUI = ({ locations, data: { employees, pagination } }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('limit') || '8'
  const branch = searchParams.get('branch') || ''

  const handlePageChange = (val: number) => navigate('page', val.toString())
  const handleLimitChange = (val: string | null) => navigate('limit', val!)
  const handleBranchChange = (val: string | null) => navigate('branch', val || '')

  const [interSearch, setInterSearch] = useState('')
  const [search] = useDebouncedValue(interSearch, 400)

  useEffect(() => {
    navigate('search', search)
  }, [search, navigate])

  return (
    <Container size="xl" mt="md">
      {employees ? (
        <>
          <Group justify="space-between" mb="sm">
            <Select
              placeholder="Branch/Sub-Branch"
              data={locations}
              value={branch}
              onChange={handleBranchChange}
              searchable
              miw="25%"
            />

            <TextInput
              placeholder="Search..."
              value={interSearch}
              onChange={(event) => setInterSearch(event.currentTarget.value)}
              leftSection={<SearchIcon />}
              data-autofocus
              miw="33.3%"
            />
          </Group>

          <SimpleGrid spacing="xs" cols={4}>
            {employees.map(
              (
                { avatar, name, designation, department, branch, empId, cellNo, phone, email }: TEmployee,
                index: number
              ) => (
                <Paper p="sm" key={index} shadow="xs">
                  <Group justify="center">
                    <Avatar src={avatar} alt={name} size={100} />
                  </Group>

                  <Title order={4} ta="center" size="xs" mt={12}>
                    {capWords(name)}
                  </Title>

                  <Text size="xs" ta="center" mt={4}>
                    {designation}, {capWords(department)}
                  </Text>

                  {branch && (
                    <Text size="xs" ta="center">
                      {branch?.name} ({branch?.code})
                    </Text>
                  )}

                  <Group mt={12} gap={4}>
                    <IdIcon />
                    <Text size="xs">Employee ID: {empId}</Text>
                  </Group>

                  <Group mt={6} gap={8}>
                    <MobileIcon size={12} />
                    <Text size="xs">{cellNo || 'Not provided'}</Text>
                  </Group>

                  <Group mt={6} gap={8}>
                    <PhoneIcon size={12} />
                    <Text size="xs">{phone || 'Not provided'}</Text>
                  </Group>

                  <Group mt={6} gap={8}>
                    <EmailIcon size={12} />
                    <Text size="xs">{email || 'Not provided'}</Text>
                  </Group>
                </Paper>
              )
            )}
          </SimpleGrid>

          <Group justify="space-between" mt="xs">
            <Select
              label="Data Per Page"
              data={['8', '16', '40', '100']}
              value={limit}
              onChange={handleLimitChange}
              allowDeselect={false}
              size="xs"
            />

            <Pagination size="sm" value={page} onChange={handlePageChange} total={pagination.totalPages} />
            <Text size="sm">Total: {pagination.total} employees</Text>
          </Group>
        </>
      ) : (
        <Alert title="Something Went Wrong!" icon={<ErrorIcon />} color="red">
          Maybe the application couldn&apos;t connect with InterBridge API Properly. Please contact Admin.
        </Alert>
      )}
    </Container>
  )
}

export default ContactBookUI
