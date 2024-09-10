'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalsProvider } from '@mantine/modals'

import StructureShell from './shell'

const queryClient = new QueryClient()

const Structure = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>
        <StructureShell>{children}</StructureShell>
      </ModalsProvider>
    </QueryClientProvider>
  </SessionProvider>
)

export default Structure
