import Layout from 'components/Layout'
import { PlayerProvider } from 'context/PlayerContext'
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlayerProvider>
  )
}

export default App
