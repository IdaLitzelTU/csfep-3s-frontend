import React, { useState } from "react"
import Router from "next/router"

import { useQuery } from "react-query"

import { Button, Grow, Stack, Typography } from "@mui/material"

import * as client from "../api/csfep"

import Loader from "./Loader"
import DatasetSelection from "./DatasetSelection"
import FormRender from "./FormRender"
import { getFieldValue } from "./FieldRender"
import ModelMeta from "./ModelMeta"
import ModelSelection from "./ModelSelection"

const dataset_object = {
  id: "-1",
  dataset_name: "",
  organisation_name: "",
  publisher_name: "",
  description: "",
  version: [],
}

const RunModel = () => {
  const [version, setVersion] = useState("")
  const [outputLoading, setOutputLoading] = useState(false)
  const [dataset, setDataset] = useState(dataset_object)
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
    const empty = (key) => data[key]?.length < 1
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
      Router.push(
        `/run?version=${version}&dataset=${datasetId}&dataset_name=${dataset.dataset_name}`
      )
    } else {
      setStatus("Running 3S Model")
      Router.push(
        `/run?version=${version}&dataset=${JSON.stringify(
          payload.data
        )}&dataset_name=${dataset.dataset_name}`
      )
    }
  }

  function getData() {
    const names = data ? [...new Set(data.input)] : []
    let inputData = []

    names.forEach((input) => {
      inputData.push(getFieldValue(input))
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
    <>
      <Loader loading={outputLoading} status={status} />
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
              {inputError}
            </Typography>
          </Grow>
          <h4>Available Model Versions: {"  "} </h4>
          <ModelSelection version={version} setVersion={setVersion} />
          <ModelMeta version={version} />
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
            <FormRender version={version} dataset={dataset} />
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
        </div>
      </Stack>
    </>
  )
}

export default RunModel
