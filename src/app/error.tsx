'use client'

import Link from 'next/link'
import { Button, Container, Group } from '@mantine/core'
import { BiReset as ResetIcon } from 'react-icons/bi'
import { TiArrowBack as BackIcon } from 'react-icons/ti'

import ErrorMsg from '@components/common/ErrorMsg'

type Types = {
  error: Error
  reset: () => void
}

const Error = ({ error, reset }: Types) => (
  <Container>
    <ErrorMsg error={error} />

    <Group mt="md">
      <Button variant="gradient" component={Link} href="/" leftSection={<BackIcon />}>
        Back to Homepage
      </Button>

      <Button variant="outline" onClick={() => reset()} leftSection={<ResetIcon />}>
        Try again
      </Button>
    </Group>
  </Container>
)

export default Error
