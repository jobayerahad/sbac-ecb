'use client'

import { useEffect, useState } from 'react'
import {
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
import { useQuery } from '@tanstack/react-query'

import { MdLocalPhone as PhoneIcon, MdPermIdentity as IdIcon, MdAlternateEmail as EmailIcon } from 'react-icons/md'
import { FaMobileAlt as MobileIcon } from 'react-icons/fa'
import { IoSearch as SearchIcon } from 'react-icons/io5'

import { getEmployees } from './services'
import { TLocation, IEmployee } from '@types'
import { convertLocationData } from '@utils/formatter.utils'

type Props = {
  locations: {
    branches: TLocation[]
    sub_branches: TLocation[]
  }
}

const ContactBookUI = ({ locations }: Props) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('8')
  const [branch, setBranch] = useState('')
  const [interSearch, setInterSearch] = useState('')
  const [search] = useDebouncedValue(interSearch, 400)

  const { data, isLoading } = useQuery({
    queryKey: ['contacts', page, limit, search, branch],
    queryFn: () => getEmployees(page, Number(limit), search, branch),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    setPage(1)
  }, [interSearch, branch])

  return (
    <Container size="lg" mt="xl">
      <Group justify="space-between" mb="md">
        <Select
          placeholder="Branch/Sub-Branch"
          data={convertLocationData(locations)}
          value={branch}
          onChange={(code) => setBranch(code || '')}
          searchable
          miw="25%"
          disabled={isLoading}
        />

        <TextInput
          placeholder="Search..."
          value={interSearch}
          onChange={(event) => setInterSearch(event.currentTarget.value)}
          leftSection={<SearchIcon />}
          autoFocus
          miw="33.3%"
          disabled={isLoading}
        />
      </Group>

      <SimpleGrid cols={4}>
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <Paper key={index} p="md" shadow="xs">
                <Group justify="center" gap="xs">
                  <Skeleton height={100} circle />
                  <Skeleton height={8} radius="xl" w="90%" h={14} mt={12} />
                  <Skeleton height={8} radius="xl" w="80%" h={10} />
                  <Skeleton height={8} radius="xl" w="70%" h={10} />
                </Group>
                <Group mt="md" gap={4}>
                  <IdIcon />
                  <Skeleton height={8} mt={6} radius="xl" w="50%" />
                </Group>
                <Group mt={6} gap={8}>
                  <MobileIcon size={12} />
                  <Skeleton height={8} mt={6} radius="xl" w="50%" />
                </Group>
                <Group mt={6} gap={8}>
                  <PhoneIcon size={12} />
                  <Skeleton height={8} mt={6} radius="xl" w="50%" />
                </Group>
                <Group mt={6} gap={8}>
                  <EmailIcon size={12} />
                  <Skeleton height={8} mt={6} radius="xl" w="50%" />
                </Group>
              </Paper>
            ))
          : data?.employees?.map(
              (
                { avatar, name, designation, department, branch, empId, cellNo, phone, email }: IEmployee,
                index: number
              ) => (
                <Paper p="md" key={index} shadow="xs">
                  <Group justify="center">
                    <Avatar src={`https://hr.sbacbank.com${avatar}`} alt={name} size={100} />
                  </Group>

                  <Title order={4} ta="center" size="xs" mt={12}>
                    {name}
                  </Title>

                  <Text size="xs" ta="center" mt={4}>
                    {designation}, {department}
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
                    <Text size="xs">+{cellNo || 'Not provided'}</Text>
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

      <Group justify="space-between" mt="md">
        <Select
          label="Data Per Page"
          data={['8', '16', '40', '100']}
          value={limit}
          onChange={(val) => setLimit(val || '')}
          allowDeselect={false}
          size="xs"
          disabled={isLoading}
        />
        <Pagination
          size="sm"
          value={page}
          onChange={setPage}
          total={data?.pagination.totalPages || 1}
          disabled={isLoading}
        />
        <Text size="sm">Total: {data?.pagination?.total} employees</Text>
      </Group>
    </Container>
  )
}

export default ContactBookUI
