import * as yup from 'yup'

export const signInSchema = yup.object({
  clientId: yup.string().required('Please Enter Client ID'),
  secretKey: yup.string().required('Please Enter Secret Key')
})
