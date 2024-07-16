import { Container, Group, Paper, SimpleGrid, Skeleton } from '@mantine/core'
import { MdLocalPhone as PhoneIcon, MdPermIdentity as IdIcon, MdAlternateEmail as EmailIcon } from 'react-icons/md'
import { FaMobileAlt as MobileIcon } from 'react-icons/fa'

const LoadingUI = () => (
  <Container size="xl" mt="md">
    <SimpleGrid spacing="xs" cols={4}>
      {[...Array(8)].map((_, index) => (
        <Paper key={index} p="md" shadow="xs">
          <Group justify="center" gap="xs">
            <Skeleton height={100} circle />
            <Skeleton height={8} radius="xl" w="90%" h={14} mt={12} />
            <Skeleton height={8} radius="xl" w="80%" h={10} />
            <Skeleton height={8} radius="xl" w="70%" h={10} />
          </Group>

          <Group mt="md" gap={4}>
            <IdIcon />
            <Skeleton height={8} mt={6} radius="xl" w="50%" />
          </Group>

          <Group mt={6} gap={8}>
            <MobileIcon size={12} />
            <Skeleton height={8} mt={6} radius="xl" w="50%" />
          </Group>

          <Group mt={6} gap={8}>
            <PhoneIcon size={12} />
            <Skeleton height={8} mt={6} radius="xl" w="50%" />
          </Group>

          <Group mt={6} gap={8}>
            <EmailIcon size={12} />
            <Skeleton height={8} mt={6} radius="xl" w="50%" />
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  </Container>
)

export default LoadingUI
