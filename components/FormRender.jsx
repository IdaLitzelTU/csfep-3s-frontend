import React from "react"

import PropTypes from "prop-types"

import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import renderers from "./form/FieldRender"

const FormRender = ({ model, data }) => {
  const categories = model
    ? [...new Set(model.input.map((el) => el.category))]
    : []

  const fields = {}

  categories.forEach((key) => {
    fields[key] = model ? model.input.filter((el) => el.category === key) : [{}]
  })

  return (
    <>
      {model && data && fields && (
        <Paper
          variant="outlined"
          key={"paper-outline"}
          style={{
            marginTop: "1rem",
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
              {Object.keys(fields).map((key) => {
                return (
                  // originaly that was an empty tag, but next.js does not sit well with keyless head html tags
                  <div style={{ width: "inherit" }} key={key}>
                    <Grid item style={{ paddingBottom: "24px" }}>
                      <Divider textAlign="left">
                        <Typography
                          variant="h6"
                          style={{ color: "#005B36" }}
                          gutterBottom
                        >
                          {key}
                        </Typography>
                      </Divider>
                    </Grid>

                    {fields[key].map((element) => {
                      const Renderer = renderers[element.type]
                      // if element is staged_input pass down the whole value
                      return (
                        <Renderer
                          key={element.name}
                          value={String(data[element.name] || "")}
                          {...element}
                          default={String(element.default || "")}
                        />
                      )
                    })}
                  </div>
                )
              })}
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  )
}
export default FormRender

FormRender.propTypes = {
  model: PropTypes.object,
  data: PropTypes.object,
}
