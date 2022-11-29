import React, { useState } from "react"
import PropTypes from "prop-types"
import DoughnutChart from "./DoughnutChart"
import HalfPieChart from "./HalfPieChart"
import NumberChart from "./NumberChart"
import GroupBarChart from "./GroupBarChart"
import StackedBarChart from "./StackedBarChart"
import Assumptions from "./Assumptions"
import { Grid, Paper, Stack, Typography, Switch } from "@mui/material"
import * as util from "../api/util"
import Image from "next/image"

const colorsThreeS = ["#005B36BF", "#BE8F02", "#FFD966"]

const colorsSink = ["#462255", "#B4C6E6"]
const colorsStorage = ["#462255", "#B4C6E6", "#EEE6CF"]
const colorsSubsctitution = ["#462255", "#B4C6E6"]

const imageDivStyle = {
  position: "relative",
  borderRadius: "50%",
  padding: "10px",
  backgroundColor: "#DAE5D1",
  top: "-20px",
  left: "calc(50% - 30px)",
  width: "60px",
  height: "60px",
}
const imageProps = {
  height: 40,
  width: 40,
  style: {
    objectPosition: "center",
    objectFit: "contain",
  },
}

const paperStyle = {
  elevation: 1,
  style: {
    borderRadius: "30px",
    width: "100%",
    height: "100%",
  },
}

const Dashboard = ({ data, version, dataset }) => {
  const [units, setUnits] = useState("tC")

  const handleChange = (event) => {
    setUnits(event.target.checked ? "tCO2" : "tC")
  }

  return (
    data && (
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={4}
        columns={8}
        style={{ width: "100%", minWidth: "650px" }}
      >
        <Grid item xs={8}>
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
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h6" style={{ fontFamily: "Gotham Book" }}>
                  Measurement units:{" "}
                </Typography>
                <Typography variant="h6" style={{ fontFamily: "Gotham Book" }}>
                  tC
                </Typography>
                <Switch onChange={handleChange} />
                <Typography variant="h6" style={{ fontFamily: "Gotham Book" }}>
                  tCO2
                </Typography>
              </Stack>
              <Assumptions assumptions={data["assumptions"]} />
            </div>
          </Paper>
        </Grid>

        {getCommonValues(data, units).map((el, i) => (
          <Grid item xs={2} key={`number-container-${i}`}>
            <Paper key={`common-paper-${i}`} {...paperStyle}>
              <NumberChart {...el} />
            </Paper>
          </Grid>
        ))}

        <Grid item xs={8}>
          <Paper {...paperStyle}>
            <DoughnutChart
              data={get3sTotals(data, units)}
              colors={colorsThreeS}
            />
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Grid container columns={2} spacing={4} alignItems="stretch">
            <Grid item xs={1}>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={4}
              >
                <Paper {...paperStyle}>
                  <div style={imageDivStyle}>
                    <Image alt="Sink" src="/sink.png" {...imageProps} />
                  </div>
                  <Stack direction="row" style={{ padding: "0 5% 5% 5%" }}>
                    <HalfPieChart
                      data={[
                        {
                          name: "harvested",
                          value: 0,
                        },
                        { name: "accumulated", value: 0 },
                      ]}
                      colors={colorsSink}
                      units={units}
                    />
                  </Stack>
                </Paper>

                <Paper {...paperStyle}>
                  <div style={imageDivStyle}>
                    <Image alt="Sink" src="/storage.png" {...imageProps} />
                  </div>
                  <div style={{ padding: "0 5% 5% 5%", height: "100%" }}>
                    <StackedBarChart
                      data={getStorage(data, units)}
                      colors={colorsStorage}
                      units={units}
                    />
                  </div>
                </Paper>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack alignItems="stretch" style={{ height: "100%" }}>
                <Paper {...paperStyle}>
                  <div style={imageDivStyle}>
                    <Image alt="Sink" src="/substitution.png" {...imageProps} />
                  </div>
                  <div
                    style={{
                      padding: "0 5% 5% 5%",
                      height: "calc(100% - 32px)",
                    }}
                  >
                    <GroupBarChart
                      data={getSubstitution(data, units)}
                      colors={colorsSubsctitution}
                      units={units}
                    />
                  </div>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Image
            alt="forest"
            src="/forest.svg"
            width={1}
            height={1}
            style={{
              objectFit: "contain",
              width: "100%",
              position: "relative",
              height: "unset",
              opacity: "75%",
            }}
          />
        </Grid>
      </Grid>
    )
  )
}

function getCommonValues(data, units) {
  const buildingArea = data[units]["constants"]["Buildings floor area m2"]
  const numberOfBuildings = data[units]["constants"]["Number of Buildings"]
  const yearsToRegrowForest = data[units]["constants"]["Years to Regrow Forest"]
  const harvested = data[units]["constants"]["Harvested"]
  const accumulated = data[units]["constants"]["Accumulated"]

  return [
    {
      name: "Bulding floor area (sqm)",
      value: util.round(buildingArea),
    },
    {
      name: "Number of buildings",
      value: util.round(numberOfBuildings),
    },
    {
      name: "Months to regrow forest",
      value: util.round(yearsToRegrowForest * 12),
    },
    {
      name: `Carbon gained from forest (${units})`,
      value: util.round(harvested + accumulated),
    },
  ]
}

function getSink(data, units) {
  const harvested = util.round(data[units]["constants"]["Harvested"])
  const accumulated = util.round(data[units]["constants"]["Accumulated"])
  // const accumulated = 3

  const carbonBalance = [
    { name: "tC Harvested", value: util.round(data["Harvested"]) },
    { name: "tC Accumulated", value: util.round(data["Accumulated"]) },
  ]
  const carbonTotal = util.round(data["Accumulated"] + data["Harvested"])
  const carbonDistribution = [
    { name: "tC Stored in Scrap", value: util.round(data["C2Scrap"]) },
    { name: "tC Reintroduced in Forest", value: util.round(data["C2Forest"]) },
    { name: "tC Stored in Building", value: util.round(data["C2Buildings"]) },
  ]

  return [
    {
      name: "harvested",
      value: harvested,
    },
    { name: "accumulated", value: accumulated },
  ]
}

function getStorage(data, units) {
  const scenarios = { scenario_1: "S1", scenario_2: "S2", scenario_3: "S3" }

  const variables = {
    C2Scrap: `Carbon leftover in scrap timber after production`,
    C2Buildings: `Carbon stored in buildings`,
    C2Forest: `Carbon returned to forest`,
  }

  const out = []

  Object.keys(scenarios).forEach((scenario) => {
    const scopeData = {
      name: scenarios[scenario],
    }
    Object.keys(variables).forEach((variable) => {
      scopeData[variables[variable]] = util.round(
        data[units][scenario][variable]
      )
    })
    scopeData["total"] = `${util.round(
      data[units][scenario]["C2Scrap"] +
        data[units][scenario]["C2Buildings"] +
        data[units][scenario]["C2Forest"]
    )}`
    out.push(scopeData)
  })

  return out
}

function getSubstitution(data, units) {
  const scenarios = { scenario_1: "S1", scenario_2: "S2", scenario_3: "S3" }

  const variables = {
    "MT Production": `Timber production emission`,
    "MT Transport": `Timber transport emission`,
    "SC Production": `Steel/concrete production emission`,
    "SC Transport": `Steel/concrete transport emission`,
  }

  const out = []

  Object.keys(scenarios).forEach((scenario) => {
    const scopeData = {
      name: scenarios[scenario],
    }
    Object.keys(variables).forEach((variable) => {
      scopeData[variables[variable]] = util.round(
        data[units][scenario][variable]
      )
    })
    scopeData["totalMT"] = `${util.round(
      data[units][scenario]["MT Production"] +
        data[units][scenario]["MT Transport"]
    )}`
    scopeData["totalSC"] = `${util.round(
      data[units][scenario]["SC Production"] +
        data[units][scenario]["SC Transport"]
    )}`
    out.push(scopeData)
  })

  return out
}

function get3sTotals(data, units) {
  const scenarios = {
    scenario_1: "Scenario One",
    scenario_2: "Scenario Two",
    scenario_3: "Scenario Three",
  }

  const out = []

  Object.keys(scenarios).forEach((scenario) => {
    // formula is Sink + Substitution

    const sink = util.round(
      data[units][scenario]["Carbon Recovered during Building Lifetime"]
    )

    const storage = util.round(
      data[units][scenario]["C2Scrap"] +
        data[units][scenario]["C2Forest"] +
        data[units][scenario]["C2Buildings"]
    )

    const substitution = util.round(
      data[units][scenario]["SC Production"] +
        data[units][scenario]["SC Transport"] -
        data[units][scenario]["MT Production"] -
        data[units][scenario]["MT Transport"]
    )

    const total = util.round(sink + substitution)

    out.push({
      tooltip: `${total} ${units}`,
      title: scenarios[scenario],
      data: [
        { name: "Sink", value: sink },
        { name: "Storage", value: storage },
        { name: "Substitution", value: substitution },
      ],
    })
  })
  return out
}

Dashboard.propTypes = {
  data: PropTypes.object,
  version: PropTypes.string,
  dataset: PropTypes.string,
}

export default Dashboard
