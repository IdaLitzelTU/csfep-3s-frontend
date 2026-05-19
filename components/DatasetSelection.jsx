import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"

import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import TextField from "@mui/material/TextField"
import { Grid, ListSubheader, Paper } from "@mui/material"

import * as client from "../api/csfep"

const DatasetSelection = ({
  catalog,
  version,
  dataset,
  setDataset,
  newChecked,
  setNewChecked,
}) => {
  const [checked, setChecked] = useState(true)

  const setToNew = (e) => {
    dataset[e.target.id] = e.target.value
    setDataset(dataset)
  }
  
  const onCompatibleChange = (e) => {
    setChecked(e.target.checked)
  }

  const onNewChange = (e) => {
    setNewChecked(e.target.checked)
  }

  return (
    catalog &&
    version !== "" && (
      <Paper
        variant="outlined"
        style={{
          padding: "5rem",
          backgroundColor: "whitesmoke",
          marginTop: "1rem",
        }}
      >
        <h4 style={{ color: "#005B36" }}>Choose a Dataset: </h4>
        <>
          <FormControl fullWidth>
            <InputLabel id="select-dataset-label">Select dataset</InputLabel>
            <Select
              labelId="select-dataset"
              id="select-dataset"
              value={dataset.id}
              label="Select dataset"
              onChange={(event) => {
                setDataset(
                  catalog.filter((el) => el.id === event.target.value)[0] || {
                    dataset_name: "New dataset",
                  }
                )
              }}
            >
              <MenuItem key="new-dataset" value={"-1"}>
                New dataset
              </MenuItem>
              <ListSubheader>Existing datasets</ListSubheader>
              {(checked
                ? catalog
                    .map((el) => ({
                      ...el,
                      version: el.version.filter((v) => v.name === version),
                    }))
                    .filter((v) => v.version.length > 0)
                : catalog
              ).map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.dataset_name}
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={onCompatibleChange} />
              }
              sx={{ my: 2 }}
              label="Show datasets compatible with selected version only"
            />
            <MetaFields dataset={dataset} changeFunction={setToNew} />
            <FormControlLabel
              control={<Checkbox checked={newChecked} onChange={onNewChange} />}
              sx={{ my: 2 }}
              label="Save as new dataset"
            />
          </FormControl>
        </>
      </Paper>
    )
  )
}

const MetaFields = ({ dataset, changeFunction }) => {
  const [layout, setLayout] = useState(<></>)

  useEffect(() => {
    const buildLayout = (dataset) => {
      return (
        <Grid container columns={2} spacing={2} alignItems="stretch">
          <Grid item xs={1}>
            <TextField
              label="Your name"
              type="string"
              id="publisher_name"
              key={dataset["publisher_name"] || ""}
              defaultValue={dataset["publisher_name"] || ""}
              style={{ width: "100%" }}
              onChange={(e) => changeFunction(e)}
              placeholder="Please specify your name (optional)"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="Your organization"
              type="string"
              id="organisation_name"
              key={dataset["organisation_name"] || ""}
              defaultValue={dataset["organisation_name"] || ""}
              style={{ width: "100%" }}
              placeholder="Please specify your organization (optional)"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Dataset name"
              type="string"
              id="dataset_name"
              key={dataset["dataset_name"] || ""}
              defaultValue={dataset["dataset_name"] || ""}
              style={{ width: "100%" }}
              onChange={(e) => changeFunction(e)}
              placeholder="Please name your dataset (required)"
              required
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Dataset description"
              type="string"
              id="description"
              key={dataset["description"] || ""}
              defaultValue={dataset["description"] || ""}
              style={{ width: "100%" }}
              onChange={(e) => changeFunction(e)}
              placeholder="Please write short dataset description here (optional)"
            />
          </Grid>
        </Grid>
      )
    }
    setLayout(buildLayout(dataset))
  }, [dataset, changeFunction])

  return layout
}

MetaFields.propTypes = {
  dataset: PropTypes.object,
  changeFunction: PropTypes.func,
}

DatasetSelection.propTypes = {
  catalog: PropTypes.array,
  version: PropTypes.string,
  dataset: PropTypes.object,
  setDataset: PropTypes.func,
  newChecked: PropTypes.bool,
  setNewChecked: PropTypes.func,
}

export default DatasetSelection
