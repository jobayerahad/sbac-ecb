import { ReactNode } from 'react'
import { Container, Paper } from '@mantine/core'

import classes from './styles.module.css'

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <Container size="xs" className={classes.container}>
    <Paper p="lg" shadow="sm" className={classes.paper}>
      {children}
    </Paper>
  </Container>
)

export default AuthLayout
