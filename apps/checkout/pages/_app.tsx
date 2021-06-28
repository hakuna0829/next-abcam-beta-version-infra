import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/global.css'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to checkout!</title>
      </Head>
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default CustomApp
