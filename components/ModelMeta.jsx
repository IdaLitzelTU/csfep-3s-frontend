import React from "react"
import { Paper } from "@mui/material"
import Contact from "./info/Contact"
import Assumptions from "./info/Assumptions"

import PropTypes from "prop-types"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const ModelMeta = ({ version }) => {
  const { data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )
  return (
    version !== "" &&
    data && (
      <Paper
        variant="outlined"
        style={{
          padding: "1rem",
          backgroundColor: "whitesmoke",
          marginTop: "1rem",
        }}
      >
        <Contact meta={data["meta"]} />
        <Assumptions assumptions={data["assumptions"]} />
      </Paper>
    )
  )
}

ModelMeta.propTypes = {
  version: PropTypes.string,
}

export default ModelMeta
