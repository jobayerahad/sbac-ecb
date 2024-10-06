'use client'

import { useEffect, useTransition } from 'react'
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
  Title,
  Tooltip
} from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import {
  MdLocalPhone as PhoneIcon,
  MdPermIdentity as IdIcon,
  MdAlternateEmail as EmailIcon,
  MdErrorOutline as ErrorIcon,
  MdEdit as EditIcon,
  MdOutlineUpdate as UpdateIcon
} from 'react-icons/md'
import { FaMobileAlt as MobileIcon } from 'react-icons/fa'
import { IoSearch as SearchIcon } from 'react-icons/io5'

import EditEmployee from './edit-emp'
import useNavigation from '@hooks/useNavigation'
import { updateEmployees } from '@actions/employees'
import { divisions } from '@config/strings'
import { capWords } from '@utils/helpers.utils'
import { getMessage } from '@utils/notification'
import { GroupMenuItem, TEmployee, TEmployeeForm, TPaginatedRes } from '@types'

type Props = {
  locations: GroupMenuItem[]
  data: TPaginatedRes<TEmployee>
}

const ContactBookUI = ({ locations, data: { employees, pagination } }: Props) => {
  const [isLoading, startTransition] = useTransition()
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()
  const { status } = useSession()
  const [search, setSearch] = useDebouncedState(searchParams.get('search') || '', 400)

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('limit') || '8'
  const branch = searchParams.get('branch') || ''
  const division = searchParams.get('division') || ''

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ limit: val! })
  const handleBranchChange = (val: string | null) => navigate({ branch: val || '' })
  const handleDivisionChange = (val: string | null) => navigate({ division: val || '' })

  const editHandler = (id: string, data: TEmployeeForm) =>
    modals.open({
      title: 'Update Employee Info',
      children: <EditEmployee id={id} existing={data} />,
      centered: true
    })

  const updateHandler = () =>
    startTransition(async () => {
      const res = await updateEmployees()
      showNotification(getMessage(res))
    })

  useEffect(() => {
    navigate({ search, page: '1' })
  }, [search])

  useEffect(() => {
    navigate({ page: '1' })
  }, [branch])

  useEffect(() => {
    navigate({ page: '1' })
  }, [division])

  return (
    <Container size="xl" mt="md">
      <Text size="xs" ta="center" mb="xs">
        Note: This directory is sorted by Employee ID in ascending order. For employees with the same designation, those
        with lower Employee IDs will appear first.
      </Text>
      {employees ? (
        <>
          <Group justify="space-between" mb="sm">
            <Group gap="xs">
              <Select
                placeholder="Branch/Sub-Branch"
                data={locations || []}
                value={branch}
                onChange={handleBranchChange}
                searchable
                clearable
                w={300}
              />

              {branch === '0001' && (
                <Select
                  placeholder="Select Division"
                  data={divisions}
                  value={division}
                  onChange={handleDivisionChange}
                  searchable
                  clearable
                  w={300}
                />
              )}
            </Group>

            <Group gap="xs">
              <TextInput
                placeholder="Search..."
                defaultValue={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                leftSection={<SearchIcon />}
                data-autofocus
                w={300}
              />

              {status === 'authenticated' && (
                <Tooltip label="Update by HRBook" position="bottom" withArrow>
                  <ActionIcon variant="outline" onClick={updateHandler} loading={isLoading}>
                    <UpdateIcon />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </Group>

          <SimpleGrid spacing="xs" cols={4}>
            {employees?.map(
              ({ avatar, name, designation, department, branch, empId, cellNo, phone, email, unit, _id }, index) => (
                <Paper pt={8} pb="sm" px="sm" key={index} shadow="xs" className="person-card">
                  <Group justify="center">
                    {/* <Image src={avatar} alt={name} radius="md" w="auto" h={100} /> */}
                    <Avatar src={avatar} alt={name} size={100} />
                  </Group>

                  <Title order={4} ta="center" size="md" mt={12}>
                    {capWords(name, ['FCS'])}
                  </Title>

                  <Text size="xs" ta="center" mt={4}>
                    {designation}, {capWords(department, ['ICT', 'ICC', 'AML', 'HR', 'MIS', 'CIB', "MD's"])}
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

                  <Group mt={6} gap={8} wrap="nowrap">
                    <MobileIcon size={12} />
                    <Text size="xs">{cellNo || 'Not provided'}</Text>
                  </Group>

                  <Group mt={6} gap={8} wrap="nowrap">
                    <PhoneIcon size={12} />
                    <Text size="xs">{phone || 'Not provided'}</Text>
                  </Group>

                  <Group mt={6} gap={8} wrap="nowrap">
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
                      variant="gradient"
                      className="edit-btn"
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
