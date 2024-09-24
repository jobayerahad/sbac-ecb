'use client'

import Link from 'next/link'
import { Button, Container, Group, Image, Paper, SimpleGrid } from '@mantine/core'
import { FaDownload as DownloadIcon } from 'react-icons/fa6'

const items = [
  { logo: '/chrome.png', name: 'Chrome', file: '/chrome.exe' },
  { logo: '/firefox.png', name: 'Firefox', file: '/firefox.exe' }
]

const Downloads = () => {
  return (
    <Container>
      <SimpleGrid cols={5}>
        {items.map(({ name, logo, file }, index) => (
          <Paper p="xs" withBorder key={index}>
            <Group justify="center">
              <Image src={logo} w="auto" height={80} alt="" />
            </Group>

            <Button
              variant="light"
              size="xs"
              fullWidth
              mt="md"
              leftSection={<DownloadIcon />}
              component={Link}
              href={file}
              download
            >
              {name}
            </Button>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Downloads
