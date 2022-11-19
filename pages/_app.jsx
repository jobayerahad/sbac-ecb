import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
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
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  </>
)

export default App
