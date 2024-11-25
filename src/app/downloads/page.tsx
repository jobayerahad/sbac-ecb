'use client'

import Link from 'next/link'
import { Button, Container, Group, Image, Menu, Paper, SimpleGrid } from '@mantine/core'
import { FaDownload as DownloadIcon } from 'react-icons/fa6'
import { ImWindows as Windows7Icon } from 'react-icons/im'
import { FaWindows as Windows10Icon } from 'react-icons/fa'
import { RiArrowDownSFill as ArrowIcon } from 'react-icons/ri'

const items = [
  {
    logo: '/chrome.png',
    name: 'Chrome',
    file: {
      win7: '/chrome-109.exe',
      win10: '/chrome.exe'
    }
  },
  {
    logo: '/firefox.png',
    name: 'Firefox',
    file: {
      win7: '/firefox-115.exe',
      win10: '/firefox.exe'
    }
  }
]

const Downloads = () => (
  <Container>
    <SimpleGrid cols={5}>
      {items.map(({ name, logo, file }, index) => (
        <Paper p="xs" withBorder key={index}>
          <Group justify="center">
            <Image src={logo} w="auto" height={80} alt="" />
          </Group>

          <Menu withArrow>
            <Menu.Target>
              <Button variant="light" size="xs" fullWidth mt="md" rightSection={<ArrowIcon size={16} />}>
                {name}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<Windows7Icon />} component={Link} href={file.win7} download>
                Windows 7
              </Menu.Item>

              <Menu.Item leftSection={<Windows10Icon />} component={Link} href={file.win10} download>
                Windows 10/11
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Paper>
      ))}
    </SimpleGrid>
  </Container>
)

export default Downloads
