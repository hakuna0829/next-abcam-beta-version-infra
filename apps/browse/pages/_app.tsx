import Head from 'next/head'
import { getDataFromTree } from '@apollo/react-ssr'

import { store } from '@browse/store'
import { EnvironmentProvider } from '@browse/environment/Environment.context'
import { WindowResizeProvider } from '@browse/window-resize/window-resize.context'
import { Footer } from '@browse/components/footer/Footer'
import { FeedbackPanel } from '@browse/components/feedback-panel/FeedbackPanel'
import withApollo from '@browse/services/withApollo'

import '@browse/styles/globals.css'
import '@browse/styles/global-fonts.css'

import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme } from '@browse/theme'
import { IntlProvider } from 'react-intl'
import { SearchBar } from '@browse/search/search-bar/search-bar'

if (process.env.NODE_ENV === 'test') require('@browse/mocks')

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <IntlProvider locale="en">
          <EnvironmentProvider>
            <WindowResizeProvider>
              <Head>
                <title>Abcam</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <div className={'flex flex-col h-screen'}>
                <div id="header-container" className="relative z-feedbackPanel">
                  <FeedbackPanel />
                </div>
                <SearchBar />
                <Component {...pageProps} />
                <Footer />
              </div>
            </WindowResizeProvider>
          </EnvironmentProvider>
        </IntlProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default withApollo(MyApp, { getDataFromTree })
