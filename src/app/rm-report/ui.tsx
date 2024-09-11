'use client'

import { useState, useTransition } from 'react'
import { Button, Container, Group, NumberInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'

import { AiOutlineEnter as SubmitIcon } from 'react-icons/ai'
import { BsCalendarDate as DateIcon } from 'react-icons/bs'
import { HiOutlineIdentification as IdIcon } from 'react-icons/hi'

import RmTable from './table'
import { getRmReport } from '@actions/employees'
import { rmReportSchema } from '@schemas/rm-report.schema'
import { formatDate } from '@utils/helpers.utils'
import { getMessage } from '@utils/notification'
import { RmReportProps } from '@types'

const RmReportUI = () => {
  const [data, setData] = useState()
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm<RmReportProps>({
    initialValues: {
      empId: undefined,
      startDate: null,
      endDate: null
    },
    validate: yupResolver(rmReportSchema)
  })

  const submitHandler = (val: RmReportProps) =>
    startTransition(async () => {
      const res = await getRmReport({
        emp_id: Number(val.empId),
        start_date: formatDate(val.startDate),
        end_date: formatDate(val.endDate)
      })

      setData(res.data)
      showNotification(getMessage(res))
    })

  return (
    <Container size="xl">
      <form onSubmit={onSubmit(submitHandler)}>
        <Group align="flex-end">
          <NumberInput
            label="Employee ID"
            placeholder="Your employee ID"
            leftSection={<IdIcon size={16} />}
            autoComplete="off"
            maxLength={4}
            hideControls
            required
            flex={1}
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
            flex={1}
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
            flex={1}
            {...getInputProps('endDate')}
          />

          <Button type="submit" size="sm" leftSection={<SubmitIcon size="1.1rem" />} loading={isLoading} mt="md">
            Submit
          </Button>
        </Group>
      </form>

      {data && <RmTable data={data} />}
    </Container>
  )
}

export default RmReportUI
