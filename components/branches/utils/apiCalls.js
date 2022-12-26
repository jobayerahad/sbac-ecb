import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BRANCH_DATA } from '@config/constants'

const getBranches = async () => {
  const { data } = await axios.get('/api/branches')
  return data
}

const addBranch = async (formData) => {
  const { data } = await axios.post('/api/branches', formData)
  return data
}

const updateBranch = async (formData) => {
  const { data } = await axios.put(`/api/branches/${formData.id}`, formData)
  return data
}

export const useBranchData = () => useQuery([BRANCH_DATA], () => getBranches(), { refetchOnWindowFocus: false })

export const useAddBranchData = () => {
  const queryClient = useQueryClient()

  return useMutation(addBranch, {
    onSuccess: (data) => {
      queryClient.setQueryData([BRANCH_DATA], (oldData) => [...oldData, data])
    }
  })
}

export const useUpdateBranchData = () => {
  const queryClient = useQueryClient()

  return useMutation(updateBranch, {
    onSuccess: (data) => {
      queryClient.setQueryData([BRANCH_DATA], (oldData) =>
        oldData.map((branch) => (branch._id === data._id ? data : branch))
      )
    }
  })
}
