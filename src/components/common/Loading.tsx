'use client'

import { Flex, Loader, Text } from '@mantine/core'

type Props = {
  isComp?: boolean
}

const LoadingComponent = ({ isComp }: Props) => (
  <Flex direction="column" justify="center" align="center" gap="xs" h={isComp ? 'auto' : '12rem'}>
    <Loader size="lg" />

    <Text ta="center">Please Wait...</Text>
  </Flex>
)

export default LoadingComponent
