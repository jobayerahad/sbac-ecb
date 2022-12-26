import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@styles/main.scss'
import theme from '@config/theme'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Contact Book - SBAC Bank Ltd.</title>
    </Head>

    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </>
)

export default App
