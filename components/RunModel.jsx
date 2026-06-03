import React, { useState } from "react"

import Router from "next/router"

import { Button, Grow, Typography } from "@mui/material"

import DatasetSelection from "./DatasetSelection"
import FormRender from "./FormRender"
import Loader from "./Loader"
import ModelMeta from "./ModelMeta"
import ModelSelection from "./ModelSelection"

import useCatalog from "../hooks/useCatalog"
import useData from "../hooks/useData"
import useModel from "../hooks/useModel"

import * as client from "../api/csfep"
import { getData, isEmpty } from "./form/model"

const dataset_object = {
  id: "-1",
  dataset_name: "",
  organisation_name: "",
  publisher_name: "",
  description: "",
  version: [],
}

const RunModel = () => {
  // Flow control
  const [inputError, setError] = useState("")
  const [status, setStatus] = useState("Loading...")
  const [outputLoading, setOutputLoading] = useState(false)

  // Model version control
  const [version, setVersion] = useState("")

  // Dataset selection controls
  const [dataset, setDataset] = useState(dataset_object)
  const [newChecked, setNewChecked] = useState(false)

  // data
  const { model } = useModel({ version })
  const { catalog } = useCatalog()
  const { data } = useData({ dataset })

  const handleClick = async (e) => {
    setOutputLoading(true)
    const payload = getData(model, version, "run-model")
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
        `/run?version=${version}&dataset=${datasetId}&datasetName=${dataset.dataset_name}`
      )
    } else {
      setStatus("Running 3S Model")
      Router.push(
        `/run?version=${version}&dataset=${JSON.stringify(
          payload.data
        )}&datasetName=${dataset.dataset_name}`
      )
    }
  }

  return (
    <div id="run-model">
      <Grow
        in={inputError !== ""}
        {...(inputError !== "" ? { timeout: 1000 } : {})}
      >
        <Typography id="error" variant="h4" style={{ color: "red" }}>
          {inputError}
        </Typography>

      </Grow>
      <Grow in={true} timeout={1100}>
      <h3
      style={{
        margin: "0 auto",
        marginTop: "7rem",
        marginBottom: "1rem",
      }}
      >
      AVAILABLE MODEL VERSIONS: {"  "} </h3>
      </Grow>
      <ModelSelection version={version} setVersion={setVersion} />

      Please select a version to run the model
      <Loader loading={outputLoading} status={status} />

      <ModelMeta model={model} />
      <DatasetSelection
        catalog={catalog}
        version={version}
        dataset={dataset}
        setDataset={setDataset}
        newChecked={newChecked}
        setNewChecked={setNewChecked}
      />
      <FormRender model={model} data={data} />
      {version !== "" ? (
        <Button
          variant="contained"
          sx={{
            float: "right",
            color: "white",
            backgroundColor: "#005B36",
            textTransform: "none",
            margin: "1rem 0",
          }}
          onClick={handleClick}
        >
           Save & Run
      </Button>
    ) : (
      <h4 />
    )}

    <div
      style={{
        marginTop: "4rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="/forest.svg"
        alt="Forest"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: -1,
        }}
      />
    </div>
  </div>
)
}

export default RunModel
