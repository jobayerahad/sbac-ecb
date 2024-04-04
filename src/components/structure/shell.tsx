'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
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
import { BsMoon as DarkIcon, BsSun as LightIcon } from 'react-icons/bs'
import { MdLogout as LogoutIcon } from 'react-icons/md'

import { useIpAddressData } from '@global-states/ip'

type Props = {
  children: ReactNode
}

const StructureShell = ({ children }: Props) => {
  const pathname = usePathname()
  const { status } = useSession()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })
  const { data: ip } = useIpAddressData()

  return (
    <>
      <Group component="header" justify="space-between" px="md" py={12} m="xs" className="header">
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
            {pathname === '/rm-report' ? 'RM Report' : 'Employee Directory'}
          </Title>

          <Text c="dimmed" ta="center" size="xs">
            Find, Connect, Collaborate
          </Text>
        </div>

        <Group>
          {status === 'unauthenticated' &&
            ip?.startsWith('172.19.100.') &&
            parseInt(ip?.split('.')[3]) >= 1 &&
            parseInt(ip?.split('.')[3]) <= 254 && (
              <Anchor component={Link} href="/login">
                Login
              </Anchor>
            )}

          {status === 'authenticated' && (
            <>
              <Anchor component={Link} href="/rm-report">
                RM Report
              </Anchor>

              <ActionIcon variant="outline" onClick={() => signOut()}>
                <LogoutIcon />
              </ActionIcon>
            </>
          )}

          <ActionIcon
            variant="light"
            aria-label="color-theme"
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          >
            {computedColorScheme === 'light' ? <DarkIcon /> : <LightIcon />}
          </ActionIcon>
        </Group>
      </Group>

      <Box mih="calc(100vh - 10rem)">{children}</Box>

      <Text size="xs" component="footer" p="xs" ta="center">
        &copy; 2013 - {new Date().getFullYear()}{' '}
        <Anchor component={Link} href="https://www.sbacbank.com" c="inherit">
          SBAC Bank PLC
        </Anchor>
        . All rights reserved.
      </Text>
    </>
  )
}

export default StructureShell
