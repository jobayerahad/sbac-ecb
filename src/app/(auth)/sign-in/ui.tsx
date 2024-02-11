'use client'

import { useState } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'
import { PasswordInput, Button, Title, Text, TextInput, Group, Anchor } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'
import { CgLogIn as SignInIcon, CgPassword as PasswordIcon } from 'react-icons/cg'
import { FaMobileAlt as PhoneIcon } from 'react-icons/fa'

import classes from '../styles.module.css'
import { signInSchema } from '@schemas/auth.schema'
import { LoginForm } from '@types'

const SignInUI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useRouter()

  const { onSubmit, getInputProps } = useForm<LoginForm>({
    validate: yupResolver(signInSchema),
    initialValues: {
      clientId: '',
      secretKey: ''
    }
  })

  const submitHandler = async (values: LoginForm) => {
    setIsLoading(true)

    const response: SignInResponse | undefined = await signIn('credentials', { ...values, redirect: false })

    if (response?.error) {
      showNotification({
        title: response ? 'Unauthorized' : 'Unexpected Error',
        message: response ? response.error : 'An unexpected error occurred. Please try again',
        icon: <ErrorIcon />,
        color: 'red'
      })

      setIsLoading(false)
      return
    }

    refresh()
    setIsLoading(false)
  }

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Title size={25} mb={4} tt="uppercase" className={classes.title}>
        Sign In
      </Title>

      <Text size="sm" mb="md" className={classes.subtitle}>
        Welcome back
      </Text>

      <TextInput
        label="Client ID"
        placeholder="Enter client ID"
        leftSection={<PhoneIcon />}
        {...getInputProps('clientId')}
      />

      <PasswordInput
        label="Secret Key"
        placeholder="Enter secret key"
        leftSection={<PasswordIcon />}
        mt="xs"
        {...getInputProps('secretKey')}
      />

      <Button type="submit" leftSection={<SignInIcon size="1.1rem" />} mt="md" loading={isLoading} fullWidth>
        Sign In
      </Button>
    </form>
  )
}

export default SignInUI
