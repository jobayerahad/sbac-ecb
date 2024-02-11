import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import SignInUI from './ui'
import { authOptions } from '@utils/authOptions'

export const metadata: Metadata = {
  title: 'Sign In'
}

const SignIn = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')

  return <SignInUI />
}

export default SignIn
