'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import {
  ActionIcon,
  Alert,
  Avatar,
  Container,
  Group,
  Pagination,
  Paper,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { modals } from '@mantine/modals'

import { MdLocalPhone as PhoneIcon, MdPermIdentity as IdIcon, MdAlternateEmail as EmailIcon } from 'react-icons/md'
import { FaMobileAlt as MobileIcon } from 'react-icons/fa'
import { IoSearch as SearchIcon } from 'react-icons/io5'
import { MdErrorOutline as ErrorIcon, MdEdit as EditIcon } from 'react-icons/md'

import EditEmployee from './edit-emp'
import useNavigation from '@hooks/useNavigation'
import { capWords } from '@utils/helpers.utils'
import { GroupMenuItem, TEmployee, TEmployeeForm, TPaginatedRes } from '@types'

type Props = {
  locations: GroupMenuItem[]
  data: TPaginatedRes<TEmployee>
}

const ContactBookUI = ({ locations, data: { employees, pagination } }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()
  const { status } = useSession()
  const [search, setSearch] = useDebouncedState(searchParams.get('search') || '', 400)

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('limit') || '8'
  const branch = searchParams.get('branch') || ''

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ limit: val! })
  const handleBranchChange = (val: string | null) => navigate({ branch: val || '' })

  const editHandler = (id: string, data: TEmployeeForm) =>
    modals.open({
      title: 'Update Employee Info',
      children: <EditEmployee id={id} existing={data} />,
      centered: true
    })

  useEffect(() => {
    navigate({ search, page: '1' })
  }, [search])

  return (
    <Container size="xl" mt="md">
      {employees ? (
        <>
          <Group justify="space-between" mb="sm">
            <Select
              placeholder="Branch/Sub-Branch"
              data={locations || []}
              value={branch}
              onChange={handleBranchChange}
              searchable
              clearable
              w={300}
            />

            <TextInput
              placeholder="Search..."
              defaultValue={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              leftSection={<SearchIcon />}
              data-autofocus
              w={300}
            />
          </Group>

          <SimpleGrid spacing="xs" cols={4}>
            {employees?.map(
              (
                { avatar, name, designation, department, branch, empId, cellNo, phone, email, unit, _id }: TEmployee,
                index: number
              ) => (
                <Paper pt={8} pb="sm" px="sm" key={index} shadow="xs" pos="relative">
                  <Group justify="center">
                    {/* <Image src={avatar} alt={name} radius="md" w="auto" h={100} /> */}
                    <Avatar src={avatar} alt={name} size={100} />
                  </Group>

                  <Title order={4} ta="center" size="xs" mt={12}>
                    {capWords(name)}
                  </Title>

                  <Text size="xs" ta="center" mt={4}>
                    {designation}, {capWords(department)}
                    {unit && `, ${unit}`}
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

                  {/* {empId === 1159 && (
                    <Badge
                      tt="capitalize"
                      fw="normal"
                      variant="filled"
                      color="orange"
                      pos="absolute"
                      top="0.5rem"
                      right="0.5rem"
                    >
                      On Leave
                    </Badge>
                  )} */}

                  {status === 'authenticated' && (
                    <ActionIcon
                      variant="light"
                      color="dark"
                      pos="absolute"
                      top="0.5rem"
                      right="0.5rem"
                      onClick={() => editHandler(_id, { cellNo, email, phone, unit })}
                    >
                      <EditIcon />
                    </ActionIcon>
                  )}
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
