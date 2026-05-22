import { Paper, Stack, Typography, Switch } from "@mui/material"
import React, { useState } from "react"
import Assumptions from "../info/Assumptions"
import PropTypes from "prop-types"
import { paperStyle, typographyh6 } from "./styling"

const DashboardHeader = ({ data, datasetName, version, handleChange }) => {
  return (
    <Paper {...paperStyle}>
      <div
        style={{
          margin: "0 auto",
          padding: "2%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" style={{ fontFamily: "Gotham Medium" }}>
          Climate Smart Forest Economy Program: 3
          <span style={{ color: "green" }}>S</span>
          Model {`${version}`}
          {datasetName && (
            <>
              <br />
              Building Initiative: {datasetName}
            </>
          )}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography {...typographyh6}>Measurement units: </Typography>
          {version === "vTC" ? (
            <Typography {...typographyh6}>kgC</Typography>
          ) : (
            <>
              <Typography {...typographyh6}>tC</Typography>
              <Switch onChange={handleChange} />
              <Typography {...typographyh6}>tCO2</Typography>
            </>
          )}
        </Stack>
        <Assumptions assumptions={data["output_description"]} />
      </div>
    </Paper>
  )
}

DashboardHeader.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  version: PropTypes.string.isRequired,
  datasetName: PropTypes.string,
}

export default DashboardHeader
