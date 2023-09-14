import React from "react"
import { Paper } from "@mui/material"
import Contact from "./info/Contact"
import Assumptions from "./info/Assumptions"

import PropTypes from "prop-types"

const ModelMeta = ({ model }) => {
  return (
    model && (
      <Paper
        variant="outlined"
        style={{
          padding: "1rem",
          backgroundColor: "whitesmoke",
          marginTop: "1rem",
        }}
      >
        <Contact meta={model["meta"]} />
        <Assumptions assumptions={model["assumptions"]} />
      </Paper>
    )
  )
}

ModelMeta.propTypes = {
  model: PropTypes.object,
}

export default ModelMeta
