import React from "react"
import PropTypes from "prop-types"
import { Grid, Paper, Typography } from "@mui/material"
import { paperStyle, imageDivStyle, imageProps } from "../dashboard/styling"
import SimpleBarChart from "../charts/SimpleBarChart"
import CopyTextField from "../CopyTextField"
import Image from "next/image"
import DashboardHeader from "../dashboard/DashboardHeader"
import Footer from "../dashboard/Footer"

const colors = ["#005B36BF", "#BE8F02", "#FFD966"]

const Dashboard = ({ data }) => {
  const chartdata = [
    {
      name: "S1",
      value: parseFloat(data.emmissions.min.toFixed(3)),
    },
    {
      name: "S2",
      value: parseFloat(data.emmissions.best.toFixed(3)),
    },
    {
      name: "S3",
      value: parseFloat(data.emmissions.max.toFixed(3)),
    },
  ]
  const roundedData = Object.values(data.emmissions).map((d) =>
    parseFloat(d).toFixed(3)
  )

  return (
    data && (
      <Grid
        container
        alignItems="stretch"
        spacing={4}
        columns={8}
        style={{ width: "100%", minWidth: "650px" }}
      >
        <Grid item xs={8}>
          <DashboardHeader data={data} version={"vTC"} />
        </Grid>
        <Grid item xs={8}>
          <Paper {...paperStyle}>
            <div style={imageDivStyle}>
              <Image alt="Sink" src="/substitution.png" {...imageProps} />
            </div>
            <div
              style={{
                margin: "0 auto",
                padding: "2%",
                textAlign: "center",
              }}
            >
              <div>
                <Typography
                  variant="h4"
                  textTransform="capitalize"
                  style={{
                    fontFamily: "Gotham Medium",
                  }}
                  gutterBottom
                >
                  CARBON EMMISSIONS
                </Typography>
              </div>
              <SimpleBarChart chartData={chartdata} colors={colors} />

              <div style={{ marginBotto: "1rem" }}>
                <Typography
                  variant="h6"
                  fontFamily={"Gotham Medium"}
                  style={{ lineHeight: 1.5, padding: "1rem" }}
                >
                  Copy the below values into any model that uses &apos;Carbon
                  emmitted transporting&apos; variable [kgC]
                </Typography>
              </div>
              <div>
                <CopyTextField value={roundedData} label="Emmissions output" />
              </div>
            </div>
          </Paper>
        </Grid>
        <Footer />
      </Grid>
    )
  )
}

Dashboard.propTypes = {
  data: PropTypes.object,
  version: PropTypes.string,
  dataset: PropTypes.array,
  dataset_name: PropTypes.string,
}

export default Dashboard
