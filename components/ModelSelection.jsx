import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"

import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"

import useVersions from "../hooks/useVersions"

const ModelSelection = ({ version, setVersion }) => {
  const { versions } = useVersions()

  return (
    versions && (
      <div>
        <FormControl style={{ marginTop: "1rem" }} fullWidth>
          <InputLabel id="select-model-label">Model version</InputLabel>
          <Select
            labelId="select-model"
            id="select-model"
            value={version}
            label="Model version"
            onChange={(event) => setVersion(event.target.value)}
          >
            {versions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  )
}

ModelSelection.propTypes = {
  version: PropTypes.string,
  setVersion: PropTypes.func,
}

export default ModelSelection
