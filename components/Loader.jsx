import React from "react"

import PropTypes from "prop-types"

import { Backdrop, CircularProgress, Typography, Box } from "@mui/material"

const Loader = ({ loading, status }) => {
  return loading ? (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="inherit" />
        <Typography position="absolute" mt={10}>
          {status}
        </Typography>
        <Typography position="absolute" mt={15}>
          Please do not close this page.
        </Typography>
      </Box>
    </Backdrop>
  ) : null
}

Loader.propTypes = {
  loading: PropTypes.boolean,
  status: PropTypes.string,
}

export default Loader
