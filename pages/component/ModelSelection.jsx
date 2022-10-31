import React, { useState } from "react"
import { useQuery } from "react-query"
import * as client from "../api/csfep"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"

const ModelSelection = () => {
  const { isLoading, error, data } = useQuery(
    ["model-versions"],
    client.fetchModelVersion
  )

  const [modelVersion, setModelVersion] = useState(undefined)

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
        <InputLabel id="select-model-label">Select model version</InputLabel>
        <Select
          labelId="select-model"
          id="select-model"
          value={modelVersion}
          label="Model version"
          onChange={(event) => setModelVersion(event.target.value)}
        >
          {data.map((version) => (
            <MenuItem key={version} value={version}>
              {version}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  )
}

export default ModelSelection
