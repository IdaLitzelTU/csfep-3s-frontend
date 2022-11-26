import React, { useState } from "react"

import { useRouter } from "next/router"
import { useQuery } from "react-query"

import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Backdrop from "@mui/material/Backdrop"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grow from "@mui/material/Grow"
import Router from "next/router"

import * as client from "../api/csfep"

import ModelSelection from "./ModelSelection"
import ModelRender from "./ModelRender"
import DatasetSelection from "./DatasetSelection"
import ModelMeta from "./ModelMeta"

const RunModel = () => {
  const router = useRouter()
  const [version, setVersion] = useState("")
  const [outputLoading, setOutputLoading] = useState(false)
  const [dataset, setDataset] = useState({})
  const [inputError, setError] = useState("")
  const [newChecked, setNewChecked] = useState(false)

  const [status, setStatus] = useState("Loading...")

  const { isLoading, error, data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
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

  const isEmpty = (data) => {
    const empty = (key) => data[key].length < 1
    return Object.keys(data).some(empty)
  }

  const handleClick = async (e) => {
    setOutputLoading(true)
    const payload = getData()
    setStatus("Checking your data")

    // check if data is empty
    if (isEmpty(payload.data)) {
      setOutputLoading(false)
      setError("Please fill all required input fields")
      window.scrollTo(0, 0)
      // document.getElementById("error").scrollIntoView()
      return
    }

    // if data is not empty then check if you want to persist the model
    if (newChecked) {
      setStatus("Saving your dataset")
      const datasetId = await client.postNewDataset(payload)
      setStatus("Running 3S Model")
      Router.push(`/results?version=${version}&dataset=${datasetId}`)
    } else {
      setStatus("Running 3S Model")
      Router.push(
        `/run?version=${version}&dataset=${JSON.stringify(payload.data)}`
      )
    }
  }

  function formatArray(value) {
    return `[${value}]`
  }

  function getData() {
    const names = data ? [...new Set(data.input)] : []
    const inputData = {}
    names.forEach((input) => {
      inputData[input.name] = input.type.startsWith("array")
        ? formatArray(document.getElementById(input.name).value)
        : document.getElementById(input.name).value
    })

    const datasetMeta = [
      "dataset_name",
      "publisher_name",
      "organisation_name",
      "description",
    ]

    const newDataset = {}
    datasetMeta.forEach((dm) => {
      newDataset[dm] = document.getElementById(dm).value
    })
    newDataset["version"] = version
    newDataset["data"] = inputData

    return newDataset
  }

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={2}
      height="100%"
    >
      <div>
        <Grow
          in={error !== "" || inputError !== ""}
          {...(error !== "" || inputError !== "" ? { timeout: 1000 } : {})}
        >
          <Typography id="error" variant="h4" style={{ color: "red" }}>
            {error}
            <br />
            {inputError}
          </Typography>
        </Grow>
        <h4>Available Model Versions: {"  "} </h4>
        <ModelSelection version={version} setVersion={setVersion} />
        <br></br>
        <ModelMeta version={version} />
        <br></br>
        <DatasetSelection
          version={version}
          dataset={dataset}
          setDataset={setDataset}
          newChecked={newChecked}
          setNewChecked={setNewChecked}
        />
      </div>
      <div style={{ minHeight: "60vh" }}>
        {version && dataset ? (
          <ModelRender version={version} dataset={dataset} />
        ) : (
          <h4
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "50",
            }}
          >
            Please select a version to run the model
          </h4>
        )}
      </div>
      <div>
        <Button
          variant="contained"
          sx={{
            float: "right",
            color: "white",
            backgroundColor: "#005B36",
            textTransform: "none",
          }}
          onClick={handleClick}
          disabled={version !== "" ? false : true}
        >
          Save & Run
        </Button>
        {outputLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={outputLoading}
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
        ) : null}
      </div>
    </Stack>
  )
}

export default RunModel
