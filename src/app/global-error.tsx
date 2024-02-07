'use client'

import { Button, Container } from '@mantine/core'
import { BiReset as ResetIcon } from 'react-icons/bi'
import ErrorMsg from '@components/common/ErrorMsg'

type Types = {
  error: Error
  reset: () => void
}

const GlobalError = ({ error, reset }: Types) => (
  <html>
    <body>
      <Container>
        <ErrorMsg error={error} />

        <Button variant="outline" onClick={() => reset()} leftSection={<ResetIcon />}>
          Try again
        </Button>
      </Container>
    </body>
  </html>
)

export default GlobalError
