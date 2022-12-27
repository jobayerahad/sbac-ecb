import { useEffect, useState } from 'react'
import { Button, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { DatePicker } from '@mantine/dates'
import { HiOutlineIdentification as IdIcon } from 'react-icons/hi'
import { MdUpdate as UpdateIcon } from 'react-icons/md'
import { BsCalendarDate as OpeningDateIcon } from 'react-icons/bs'
import PropTypes from 'prop-types'

import { useUpdateBranchData } from './utils/apiCalls'
import { getLocationList } from '@utils/api'

const UpdateBranch = ({ data, closeModal }) => {
  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const { mutate } = useUpdateBranchData()

  const { onSubmit, getInputProps, reset } = useForm({
    initialValues: {
      branch_code: data.branch_code,
      sbs_code: data.sbs_code,
      branch_name: data.branch_name,
      branch_name_bangla: data.branch_name_bangla,
      address: data.address
        ? data.address
        : {
            street: '',
            street_bangla: '',
            area: '',
            nearest_place: '',
            post_code: '',
            upazila: ''
          },
      routing_no: data.routing_no,
      telephone_no: data.telephone_no,
      email: data.email,
      fax: data.fax,
      opening_date: new Date(data.opening_date ? data.opening_date : '2013-04-28')
    }
  })

  useEffect(() => {
    ;(async () => {
      setDivisions(await getLocationList('division'))
      setDistricts(await getLocationList('district'))
      setUpazilas(await getLocationList('thana'))
    })()
  }, [divisions])

  const submitHandler = (values) => {
    mutate({ id: data._id, ...values })
    reset()
    closeModal()
  }

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <SimpleGrid cols={2} mb="xs">
        <TextInput label="Branch Code" icon={<IdIcon size={16} />} {...getInputProps('branch_code')} readOnly />
        <TextInput label="SBS Code" icon={<IdIcon size={16} />} {...getInputProps('sbs_code')} />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <TextInput label="Branch Name (in English)" icon={<IdIcon size={16} />} {...getInputProps('branch_name')} />

        <TextInput
          label="Branch Name (in Bangla)"
          icon={<IdIcon size={16} />}
          {...getInputProps('branch_name_bangla')}
        />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <Textarea label="Street (in English)" icon={<IdIcon size={16} />} {...getInputProps('address.street')} />
        <Textarea label="Street (in Bangla)" icon={<IdIcon size={16} />} {...getInputProps('address.street_bangla')} />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <Select
          label="Branch Area Type"
          placeholder="Select branch area"
          data={[
            { value: 'Urban', label: 'Urban' },
            { value: 'Rural', label: 'Rural' }
          ]}
          {...getInputProps('address.upazila')}
        />
        <TextInput label="Nearest Place" icon={<IdIcon size={16} />} {...getInputProps('address.nearest_place')} />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <TextInput label="Postal Code" icon={<IdIcon size={16} />} {...getInputProps('address.post_code')} />
        <Select
          label="Upazila or Thana"
          placeholder="Select upazila or thana"
          data={upazilas}
          searchable
          {...getInputProps('address.upazila')}
        />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <Select
          label="District"
          placeholder="Select district"
          data={districts}
          searchable
          {...getInputProps('address.district')}
        />

        <Select
          label="Division"
          placeholder="Select division"
          data={divisions}
          searchable
          {...getInputProps('address.division')}
        />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <TextInput label="Routing No" icon={<IdIcon size={16} />} {...getInputProps('routing_no')} />
        <TextInput label="Telephone no" icon={<IdIcon size={16} />} {...getInputProps('telephone_no')} />
      </SimpleGrid>

      <SimpleGrid cols={2} mb="xs">
        <TextInput label="Email" icon={<IdIcon size={16} />} {...getInputProps('email')} />
        <TextInput label="Fax" icon={<IdIcon size={16} />} {...getInputProps('fax')} />
      </SimpleGrid>

      <DatePicker
        placeholder="Pick opening date"
        label="Opening Date"
        icon={<OpeningDateIcon size={16} />}
        firstDayOfWeek="sunday"
        weekendDays={[5, 6]}
        hideOutsideDates
        mb="md"
        {...getInputProps('opening_date')}
      />

      <Button leftIcon={<UpdateIcon size={14} />} size="sm" type="submit">
        Update
      </Button>
    </form>
  )
}

UpdateBranch.propTypes = {
  data: PropTypes.object.isRequired
}

export default UpdateBranch
