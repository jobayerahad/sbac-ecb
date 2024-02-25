import api from '@utils/api'

export const getBranches = async () => {
  const { data } = await api().get('/locations/type/branch')
  return data
}
