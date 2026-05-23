import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import SignInUI from './ui'
import { auth } from '@auth'

export const metadata: Metadata = {
  title: 'Sign In'
}

const SignIn = async () => {
  const session = await auth()
  if (session) redirect('/')

  return <SignInUI />
}

export default SignIn
