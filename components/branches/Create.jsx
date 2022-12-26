import { Button, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { HiOutlineIdentification as IdIcon } from 'react-icons/hi'
import PropTypes from 'prop-types'

import { getErrorMessage } from '@utils/notification'
import { useAddBranchData } from './utils/apiCalls'

const AddBranch = ({ closeModal }) => {
  const { isLoading, isSuccess, isError, error, mutate } = useAddBranchData()

  const { onSubmit, getInputProps, reset } = useForm({
    initialValues: {
      account_no: '',
      account_name: ''
    }
  })

  const submitHandler = (values) => {
    mutate(values)
    reset()
  }

  if (isSuccess) return <>{closeModal()}</>

  if (isError) showNotification(getErrorMessage(error))

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput
        label="GL Account Number"
        placeholder="Enter 8 digit GL number"
        icon={<IdIcon size={16} />}
        autoComplete="off"
        mb="xs"
        {...getInputProps('account_no')}
      />

      <TextInput
        label="GL Account Name"
        placeholder="Enter account name"
        icon={<IdIcon size={16} />}
        autoComplete="off"
        mb="xs"
        {...getInputProps('account_name')}
      />

      <Button fullWidth mt="md" size="sm" type="submit" loading={isLoading}>
        Add
      </Button>
    </form>
  )
}

AddBranch.propTypes = {
  closeModal: PropTypes.func.isRequired
}

export default AddBranch
