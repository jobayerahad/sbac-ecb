'use client'

import { useSession } from 'next-auth/react'
import { Button, Container, NumberInput, SimpleGrid } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'

import { AiOutlineEnter as SubmitIcon } from 'react-icons/ai'
import { BsCalendarDate as DateIcon } from 'react-icons/bs'
import { HiOutlineIdentification as IdIcon } from 'react-icons/hi'

import RmTable from './table'
import { useRmReportData } from '@mutations/rm-report.mutate'
import { rmReportSchema } from '@schemas/rm-report.schema'
import { formatDate } from '@utils/helpers.utils'
import { RmReportProps } from '@types'

const RmReportUI = () => {
  const { data: session } = useSession()
  const { data, mutate, isPending, status } = useRmReportData()

  const { onSubmit, getInputProps, reset } = useForm<RmReportProps>({
    initialValues: {
      empId: 0,
      startDate: null,
      endDate: null
    },
    validate: yupResolver(rmReportSchema)
  })

  const submitHandler = async (val: RmReportProps) => {
    mutate({
      token: session?.user.id || '',
      params: {
        emp_id: val.empId,
        start_date: formatDate(val.startDate),
        end_date: formatDate(val.endDate)
      }
    })
    // reset()
  }

  return (
    <Container size="xl">
      <form onSubmit={onSubmit(submitHandler)}>
        <SimpleGrid cols={4}>
          <NumberInput
            label="Employee ID"
            placeholder="Your employee ID"
            leftSection={<IdIcon size={16} />}
            autoComplete="off"
            maxLength={4}
            hideControls
            required
            {...getInputProps('empId')}
          />

          <DatePickerInput
            label="Pick Start Date"
            leftSection={<DateIcon size={16} />}
            firstDayOfWeek={6}
            weekendDays={[5, 6]}
            minDate={new Date('2013-04-28')}
            maxDate={new Date()}
            hideOutsideDates
            required
            {...getInputProps('startDate')}
          />

          <DatePickerInput
            label="Pick End date"
            leftSection={<DateIcon size={16} />}
            firstDayOfWeek={6}
            weekendDays={[5, 6]}
            minDate={new Date('2013-04-28')}
            maxDate={new Date()}
            hideOutsideDates
            required
            {...getInputProps('endDate')}
          />

          <Button type="submit" size="sm" leftSection={<SubmitIcon size="1.1rem" />} loading={isPending} mt="md">
            Submit
          </Button>
        </SimpleGrid>
      </form>

      {status === 'success' && <RmTable data={data} />}
    </Container>
  )
}

export default RmReportUI
