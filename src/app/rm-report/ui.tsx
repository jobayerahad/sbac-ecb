'use client'

import { useState, useTransition } from 'react'
import { ActionIcon, Button, Container, Group, NumberInput, Tooltip } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'

import { AiOutlineEnter as SubmitIcon } from 'react-icons/ai'
import { BsCalendarDate as DateIcon } from 'react-icons/bs'
import { HiOutlineIdentification as IdIcon } from 'react-icons/hi'
import { FaRegFilePdf as PDFIcon } from 'react-icons/fa'

import RmTable from './table'
import { getRmReport } from '@actions/employees'
import { genRmReportPDF } from '@app/_common/pdf/rm-id'
import { rmReportSchema } from '@schemas/rm-report.schema'
import { formatDate } from '@utils/helpers.utils'
import { getMessage } from '@utils/notification'
import { RmReportProps } from '@types'

const RmReportUI = () => {
  const [data, setData] = useState()
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values } = useForm<RmReportProps>({
    initialValues: {
      empId: undefined,
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date()
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
        <Group align="flex-end" gap="xs">
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
            label="Start Date"
            placeholder="Select the start date"
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
            label="End Date"
            placeholder="Select the end date"
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

          {data && (
            <Tooltip label="Download PDF" position="bottom" withArrow>
              <ActionIcon
                size="lg"
                variant="gradient"
                onClick={() =>
                  genRmReportPDF(
                    data,
                    `${new Date(values.startDate!).toLocaleString('en-US', { dateStyle: 'medium' })} to ${new Date(
                      values.endDate!
                    ).toLocaleString('en-US', { dateStyle: 'medium' })}`
                  )
                }
              >
                <PDFIcon />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </form>

      {data && <RmTable data={data} />}
    </Container>
  )
}

export default RmReportUI
