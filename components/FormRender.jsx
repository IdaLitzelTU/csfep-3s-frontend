import React, { useState } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import PropTypes from "prop-types"
import renderers from "./FieldRender"

const FormRender = ({ formData, defaultData }) => {
  return (
    <>
      {formData && (
        <Paper
          variant="outlined"
          key={"paper-outline"}
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

                    {formData[key].map((element) => {
                      const Renderer = renderers[element.type]
                      return (
                        <Renderer
                          key={element.name}
                          value={String(defaultData[element.name] || "")}
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
  formData: PropTypes.object,
  defaultData: PropTypes.object,
}
