'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Avatar, Container, Group, Pagination, Paper, Select, SimpleGrid, Text, TextInput, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { MdLocalPhone as PhoneIcon, MdPermIdentity as IdIcon, MdAlternateEmail as EmailIcon } from 'react-icons/md'
import { FaMobileAlt as MobileIcon } from 'react-icons/fa'
import { IoSearch as SearchIcon } from 'react-icons/io5'

import useNavigation from '@hooks/useNavigation'
import { getEmployees } from '@services/employees'

const ContactBookUI = () => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('limit') || '8'
  const [interSearch, setInterSearch] = useState('')
  const [search] = useDebouncedValue(interSearch, 400)

  const handlePageChange = (val: number) => navigate('page', val.toString())
  const handleLimitChange = (newLimit: any) => navigate('limit', newLimit)

  const { data, isLoading } = useQuery({
    queryKey: ['contacts', page, limit, search],
    queryFn: () => getEmployees(page, Number(limit), search),
    refetchOnWindowFocus: false
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <Container size="lg" mt="xl">
      <Group justify="right" mb="md">
        <TextInput
          placeholder="Search..."
          value={interSearch}
          onChange={(event) => setInterSearch(event.currentTarget.value)}
          leftSection={<SearchIcon />}
          autoFocus
          miw={350}
        />
      </Group>

      <SimpleGrid cols={4}>
        {data?.employees?.map(
          ({ avatar, name, designation, department, branch, empId, cellNo, phone, email }, index) => (
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
          onChange={handleLimitChange}
          allowDeselect={false}
          size="xs"
        />
        <Pagination size="sm" value={page} onChange={handlePageChange} total={data?.pagination.totalPages || 1} />
        <Text size="sm">Total: {data?.pagination?.total} employees</Text>
      </Group>
    </Container>
  )
}

export default ContactBookUI
