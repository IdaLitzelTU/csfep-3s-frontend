import React from "react"
import PropTypes from "prop-types"
import "../styles/globals.css"
import { QueryClient, QueryClientProvider } from "react-query"
import Navbar from "../components/Navbar"

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
}

export default MyApp
