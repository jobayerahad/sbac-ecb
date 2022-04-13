import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
import '@styles/main.scss'

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>SBAC Employee Contact Book</title>
    </Head>

    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
)

export default App
