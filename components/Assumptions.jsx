import React from "react"
import PropTypes from "prop-types"
import { Stack, Typography } from "@mui/material"

const Assumptions = ({ assumptions }) => {
  return (
    <Stack style={{ textAlign: "start", paddingTop: "15px" }}>
      {Object.keys(assumptions).map((assumption, index) => (
        <Typography key={`assumptions-${index}`}>
          <span style={{ fontFamily: "Gotham Medium" }}>{assumption} </span>
          <span style={{ fontFamily: "Gotham Book" }}>
            {assumptions[assumption]}
          </span>
        </Typography>
      ))}
    </Stack>
  )
}

Assumptions.propTypes = {
  assumptions: PropTypes.object,
}

export default Assumptions
