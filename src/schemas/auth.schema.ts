import { z } from 'zod'

export const signInSchema = z.object({
  clientId: z.string().min(1, 'Please Enter Client ID'),
  secretKey: z.string().min(1, 'Please Enter Secret Key')
})

export type SignInSchema = z.infer<typeof signInSchema>
