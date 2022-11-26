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
                              <Renderer
                                value={String(defaultData[element.name] || "")}
                                {...element}
                              />
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
export default FormRender

FormRender.propTypes = {
  formData: PropTypes.object,
  defaultData: PropTypes.object,
}
