'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import {
  ActionIcon,
  Anchor,
  Box,
  Group,
  Image,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme
} from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BsMoon as DarkIcon, BsSun as LightIcon } from 'react-icons/bs'

const queryClient = new QueryClient()

const Structure = ({ children }: { children: ReactNode }) => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <QueryClientProvider client={queryClient}>
      <Group
        component="header"
        justify="space-between"
        px="sm"
        py="xs"
        m="xs"
        style={{ boxShadow: '0 2px 5px 2px rgba(0,0,0,0.1)', borderRadius: 8 }}
      >
        <Link href="/">
          <Image
            w="auto"
            h={48}
            src={computedColorScheme === 'light' ? '/logo-full.png' : '/logo-white.png'}
            alt="SBAC Logo"
          />
        </Link>

        <div>
          <Title size={22} ta="center">
            Employee Directory
          </Title>
          <Text c="dimmed" ta="center" size="xs">
            Find, Connect, Collaborate
          </Text>
        </div>

        <ActionIcon
          variant="light"
          aria-label="color-theme"
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        >
          {computedColorScheme === 'light' ? <DarkIcon /> : <LightIcon />}
        </ActionIcon>
      </Group>

      <Box mih="calc(100vh - 10rem)">{children}</Box>

      <Text size="xs" component="footer" p="md" ta="center">
        &copy; 2013 - {new Date().getFullYear()}{' '}
        <Anchor component={Link} href="https://www.sbacbank.com" c="inherit">
          SBAC Bank PLC
        </Anchor>
        . All rights reserved.
      </Text>
    </QueryClientProvider>
  )
}

export default Structure
