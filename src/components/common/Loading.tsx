'use client'

import { Flex, Loader, Text } from '@mantine/core'

const LoadingComponent = () => (
  <Flex direction="column" justify="center" align="center" gap="xs" h="12rem">
    <Loader size="lg" />

    <Text ta="center">Please Wait...</Text>
  </Flex>
)

export default LoadingComponent
