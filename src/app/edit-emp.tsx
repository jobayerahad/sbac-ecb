import { useTransition } from 'react'
import { useForm } from '@mantine/form'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { StatusMsg } from '@config/strings'
import { getMessage } from '@utils/notification'
import { TEmployeeForm } from '@types'
import { updateEmployee } from '@actions/employees'
import { Button, TextInput } from '@mantine/core'

type Props = {
  id: string
  existing: TEmployeeForm
}

const EditEmployee = ({ id, existing }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm<TEmployeeForm>({
    initialValues: {
      cellNo: existing.cellNo || '',
      email: existing.email || '',
      phone: existing.phone || '',
      unit: existing.unit || ''
    }
  })

  const submitHandler = (val: TEmployeeForm) =>
    startTransition(async () => {
      const res = await updateEmployee(id, val)
      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) closeAllModals()
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput label="Cell Number" placeholder="Enter cell number" mb="xs" {...getInputProps('cellNo')} required />

      <TextInput label="Email" placeholder="Enter email" mb="xs" {...getInputProps('email')} />

      <TextInput label="Phone No" placeholder="Enter phone no" mb="xs" {...getInputProps('phone')} />

      <TextInput label="Enter Unit" placeholder="Enter unit name (if any)" mb="md" {...getInputProps('unit')} />

      <Button type="submit" size="sm" leftSection={<SaveIcon />} loading={isLoading}>
        Save
      </Button>
    </form>
  )
}

export default EditEmployee
