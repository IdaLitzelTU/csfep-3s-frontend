import React, { useState } from "react"

import { useRouter } from "next/router"
import { useQuery } from "react-query"

import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

import * as client from "../api/csfep"

import ModelSelection from "./ModelSelection"
import ModelRender from "./ModelRender"

const RunModel = () => {
  const router = useRouter()
  const [version, setVersion] = useState(undefined)

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

  const redirect = (e) => {
    e.preventDefault()
    router.push({
      pathname: `/model/${version}`,
      query: { body: body, meta: data.meta },
    })
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
        <h4>Available Model Versions: {"  "} </h4>
        <ModelSelection version={version} setVersion={setVersion} />
      </div>
      <div style={{ minHeight: "60vh" }}>
        {version ? (
          <ModelRender version={version} />
        ) : (
          <h4
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "50",
            }}
          >
            Please select a version to run a model
          </h4>
        )}
      </div>
      <div>
        <Button
          variant="contained"
          href={`/model/${version}`}
          sx={{
            // my: 2,
            float: "right",
            color: "white",
            backgroundColor: "#005B36",
            textTransform: "none",
          }}
        >
          Save & Run
        </Button>
      </div>
      {/* <span
            style={{ display: "inline-flex", justifyContent: "space-between" }}
          >
            <h6>Run notes: </h6>
            <TextField
              required
              id="outlined-required"
              label="Required"
              placeholder="Notes"
            />
          </span> */}
    </Stack>
  )
}

export default RunModel
