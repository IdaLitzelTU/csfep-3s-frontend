import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import * as client from "../pages/api/csfep"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"

// TODO: let metadata define icon for the group
// TODO: Input metadata should include
// label
// units
// key
// name (description)
// category
// categoryIcon (from the branding)
//

const Number = ({ key, default: defaultValue, display_name, ...props }) => {
  const units = getUnits(display_name)
  const label = cleanString(display_name)

  return (
    <div>
      <TextField
        label={label}
        type="number"
        id={key}
        key={key}
        // defaultValue={}
        style={{ width: "100%" }}
        placeholder={units}
        helperText={
          defaultValue === "None"
            ? ""
            : `Default value: ${defaultValue}${units ? units : ""}`
        }
        // InputProps={{
        //   startAdornment: units ? (
        //     <InputAdornment>{units}</InputAdornment>
        //   ) : (
        //     <InputAdornment></InputAdornment>
        //   ),
        // }}
      />
    </div>
  )
}

const Array = ({ key, default: defaultValue, display_name, ...props }) => {
  const units = getUnits(display_name)
  const label = cleanString(display_name)
  const [error, setError] = useState(false)
  let defaultHelper
  if (defaultValue !== "None") {
    defaultHelper = `Default value: ${defaultValue}${units ? units : ""}`
  }

  function notValidInput(input) {
    setError(false)
    const elements = input.target.value.split(",")
    if (elements.length < 2) {
      setError(true)
    }
    elements.forEach((el) => {
      if (isNaN(el)) {
        setError(true)
      }
    })
    return error
  }

  return (
    <div>
      <TextField
        label={label}
        error={error}
        id={key}
        key={key}
        // defaultValue={}
        style={{ width: "100%" }}
        placeholder={units}
        helperText={`Input comma separated numbers. ${defaultHelper}`}
        onChange={(e) => notValidInput(e)}
      />
    </div>
  )
}

const renderers = {
  number: Number,
  "array[number]": Array,
}

const DynamicRender = () => {
  const { data } = useQuery(["model-input"], client.fetchModelInput)

  const [formData, setFormData] = useState(undefined)

  useEffect(() => {
    if (data) {
      const categories = data
        ? [...new Set(data.input.map((el) => el.category))]
        : []

      const tempFormData = {}

      categories.forEach((key) => {
        tempFormData[key] = data
          ? data.input.filter((el) => el.category === key)
          : [{}]
      })

      setFormData(tempFormData)
    }
  }, [data])

  return (
    <>
      {formData && (
        <Paper
          variant="outlined"
          elevation={12}
          style={{
            padding: "5rem",
            backgroundColor: "whitesmoke",
          }}
        >
          <Box component="form" noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              {Object.keys(formData).map((key) => {
                return (
                  <>
                    <Grid item key={key} style={{ paddingBottom: "24px" }}>
                      <Divider textAlign="left">
                        <Typography
                          variant="h5"
                          style={{ color: "#005B36" }}
                          gutterBottom
                        >
                          {key}
                        </Typography>
                      </Divider>
                    </Grid>

                    {formData[key].map((element) => {
                      const Renderer = renderers[element.type]
                      return (
                        <Grid
                          item
                          key={element.name}
                          style={{ paddingBottom: "24px" }}
                        >
                          <Grid
                            container
                            direction="row"
                            spacing={2}
                            columns={5}
                            alignItems="stretch"
                          >
                            <Grid item xs={3} style={{}}>
                              <div
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography>{element.description}</Typography>
                              </div>
                            </Grid>
                            <Grid item xs={2}>
                              <Renderer {...element} />
                            </Grid>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </>
                )
              })}
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  )
}
export default DynamicRender

function getUnits(string) {
  let units
  try {
    const [left, right] = string.split("(")
    const rest = right.split(")")
    units = rest[0]
  } catch {
    return undefined
  }
  return units
}

function cleanString(string) {
  return string.split("(")[0]
}
