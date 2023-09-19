import React from "react"
import Head from "next/head"
import PropTypes from "prop-types"
import "../styles/globals.css"
import styles from "../styles/Home.module.css"
import { QueryClient, QueryClientProvider } from "react-query"
import Navbar from "../components/navigation/Navbar"

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>CSFEP 3S Model</title>
          <meta
            name="description"
            content="Climate Smart Forest Economic Programme"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
        {/* <footer className={styles.footer}></footer> */}
      </div>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}

export default MyApp
