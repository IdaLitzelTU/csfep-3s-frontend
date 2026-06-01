import React, { useState } from "react"
import PropTypes from "prop-types"

import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { Button, Grow, Typography } from "@mui/material"

import useVersions from "../hooks/useVersions"

const ModelSelection = ({ version, setVersion }) => {
  const { versions, meta } = useVersions()
  const versionLabels = {
    v2: "CITY TO FOREST",
    v3: "FOREST TO CITY",
    vTC: "TRANSPORT CALCULATOR"
  }

  return (
    versions && (
      <Grow in={true} timeout={1100}>
        <div>
          <List sx={{ listStyleType: "disc", pl: 3,}}>
            {versions.map((version) => (
              <ListItem
                key={version}
                sx={{ display: "list-item", color: "black" }}
              >
                {meta[version].description}
              </ListItem>
            ))}
          </List>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-model-label">
              Model version
            </InputLabel>

            <Select
              labelId="select-model-label"
              id="select-model"
              value={version}
              label="Model version"
              onChange={(event) => setVersion(event.target.value)}
            >
              {versions.map((v) => (
                <MenuItem key={v} value={v}>
                  {versionLabels[v] || v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grow>
    )
  )
}

ModelSelection.propTypes = {
  version: PropTypes.string,
  setVersion: PropTypes.func,
}

export default ModelSelection
