'use client'

import { Button, Container, NumberInput, SimpleGrid, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'
import { AiOutlineEnter as SubmitIcon } from 'react-icons/ai'
import { BsCalendarDate as DateIcon } from 'react-icons/bs'
import { HiOutlineIdentification as IdIcon } from 'react-icons/hi'

import { rmReportSchema } from './utils/schemas'
import { formatDate } from '@utils/helpers.utils'
import { rmReportProps } from '@types'
import RmReport from './Report'

const RmReportForm = () => {
  // const { isLoading, mutate, data } = useRmReportData()

  const { onSubmit, getInputProps, reset } = useForm<rmReportProps>({
    initialValues: {
      empId: 0,
      startDate: null,
      endDate: null
    },
    validate: yupResolver(rmReportSchema)
  })

  const submitHandler = async (val: rmReportProps) => {
    // mutate({
    //   emp_id: val.empId,
    //   start_date: formatDate(val.startDate),
    //   end_date: formatDate(val.endDate)
    // })
    // reset()
  }

  return (
    <Container>
      <Title ta="center" order={2} my="xs">
        RM Report
      </Title>

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

          {/* <Button type="submit" size="sm" leftSection={<SubmitIcon size="1.1rem" />} loading={isLoading} mt="md">
            Submit
          </Button> */}
        </SimpleGrid>
      </form>

      {/* {data?.length > 0 && <RmReport data={data} />} */}
    </Container>
  )
}

export default RmReportForm
