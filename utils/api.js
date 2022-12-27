import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { EMPLOYEES_DATA } from '@config/constants'

const getEmployees = async () => {
  const { data } = await axios.get('api/employees')
  return data
}

export const useEmployeesData = () => useQuery([EMPLOYEES_DATA], () => getEmployees(), { refetchOnWindowFocus: false })

export const getLocationList = async (location) => {
  const { data } = await axios.get(`api/locations?type=${location}`)

  return data.map(({ code, name_en, name_bn }) => ({ value: code, label: `${name_en} (${name_bn})` }))
}
