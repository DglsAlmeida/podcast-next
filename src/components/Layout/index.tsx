import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import Head from 'next/head'
import GlobalStyle from 'styles/global'
import { Header } from 'components/Header'
import { Player } from 'components/Player'
import { Wrapper } from './styles'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Head>
          <title>PodCast App</title>
        </Head>
        <GlobalStyle />
        <main>
          <Header />
          {children}
        </main>
        <Player />
      </Wrapper>
    </ThemeProvider>
  )
}
