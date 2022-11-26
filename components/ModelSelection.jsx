import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"

import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"

import * as client from "../api/csfep"

const ModelSelection = ({ version, setVersion }) => {
  const { isLoading, error, data } = useQuery(
    ["model-versions"],
    client.fetchModelVersion
  )

  if (isLoading)
    <>
      <div>
        <p>Loading...</p>
      </div>
    </>

  if (error)
    <>
      <div>
        <p>{JSON.stringify(error)}</p>
      </div>
    </>

  return (
    data && (
      <div>
        <FormControl fullWidth>
          <InputLabel id="select-model-label">Model version</InputLabel>
          <Select
            labelId="select-model"
            id="select-model"
            value={version}
            label="Model version"
            onChange={(event) => setVersion(event.target.value)}
          >
            {data.map((v) => (
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
