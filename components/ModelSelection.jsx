import React, { useState } from "react"
import PropTypes from "prop-types"

import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import useVersions from "../hooks/useVersions"

const ModelSelection = ({ version, setVersion }) => {
  const { versions, meta } = useVersions()

  return (
    versions && (
      <div>
        <List sx={{ listStyleType: "disc" }}>
          {versions.map((version) => (
            <ListItem
              key={version}
              sx={{ display: "list-item", color: "black" }}
            >
              {meta[version].description}
            </ListItem>
          ))}
        </List>
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
