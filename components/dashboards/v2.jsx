import * as util from "../../api/util"

import { Grid, Paper, Stack } from "@mui/material"
import React, { useState } from "react"
import DoughnutChart from "../charts/DoughnutChart"
import GroupBarChart from "../charts/GroupBarChart"
import Image from "next/image"
import NumberChart from "../charts/NumberChart"
import PropTypes from "prop-types"
import RadialBChart from "../charts/RadialChart"
import StackedBarChart from "../charts/StackedBarChart"
import { paperStyle, imageDivStyle, imageProps } from "../dashboard/styling"
import DashboardHeader from "../dashboard/DashboardHeader"
import Footer from "../dashboard/Footer"
import SimpleTable from "../charts/SimpleTableChart_v2"

const colorsThreeS = ["#005B36BF", "#BE8F02", "#FFD966"]

const colorsSink = ["#005B36BF"]
const colorsStorage = ["#7B3F00", "#B87333", "#D27D2D"]
const colorsSubsctitution = ["#FFC000", "#FFD966"]

const Dashboard = ({ data, version, datasetName }) => {
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
          <DashboardHeader
            data={data}
            handleChange={handleChange}
            version={version}
            datasetName={datasetName}
          />
        </Grid>

        {getCommon(data, units).map((el, i) => (
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
                    <RadialBChart
                      data={getSink(data, units)}
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
          <Paper
            {...{
              elevation: 1,
              style: {
                borderRadius: "30px",
                width: "100%",
                height: "100%",
                overflow: "auto",
              },
            }}
          >
            <SimpleTable data={getCommonValues(data, units)} />
          </Paper>
        </Grid>
        <Footer />
      </Grid>
    )
  )
}

function getCommon(data, units) {
  const buildingArea = data[units]["constants"]["Buildings floor area m2"]
  const numberOfBuildings = data[units]["constants"]["Number of Buildings"]
  const harvested = data[units]["constants"]["Harvested"]

  return [
    {
      name: "Bulding floor area [m2]",
      value: util.round(buildingArea),
    },
    {
      name: "Number of buildings",
      value: util.round(numberOfBuildings),
    },
    {
      name: `Carbon harvested [${units}]`,
      value: util.round(harvested ),
    },
  ]
}

function getCommonValues(data, units) {
  const scenarios = {
    scenario_1: "S1",
    scenario_2: "S2",
    scenario_3: "S3",
  }

  const out = Object.keys(scenarios).map((scenario) => {
    const accumulated = data[units][scenario]["Carbon Recovered during Building Lifetime"]
    const yearsToRegrowForest = data[units][scenario]["Years_to_Regrow"]
    const accumulated_i = data[units][scenario]["Carbon Recovered during Building Lifetime_intensity"]
    const yearsToRegrowForest_i = data[units][scenario]["Years_to_Regrow_intensity"]

    return [
      scenarios[scenario],
      util.round(accumulated),
      util.round(yearsToRegrowForest),
      util.round(accumulated_i),
      util.round(yearsToRegrowForest_i),
    ]
  })

  out.unshift([
    "Scenario",
    `Forest carbon recovery\n(full area)\n[${units}]`,
    "Regrowth time\n(full area)\n[years]",
    `Forest carbon recovery\n(harvested share)\n[${units}]`,
    "Regrowth time\n(harvested share)\n[years]",
  ])
  return out
}

function getSink(data, units) {
  const scenarios = {
    scenario_1: "S1",
    scenario_2: "S2",
    scenario_3: "S3",
  }

  const out = []

  Object.keys(scenarios).forEach((scenario) => {
    out.push({
      key: scenario,
      name: "Carbon recovered during building lifetime",
      tooltip: scenarios[scenario],
      value: util.round(
        data[units][scenario]["Carbon Recovered during Building Lifetime"]
      ),
    })
  })

  return out
}

function getStorage(data, units) {
  const scenarios = { scenario_1: "" }
  const variables = {
    C2Buildings: `Building`,
    C2Scrap: `Scrap wood`,
    //C2Forest: `Forest`,
  }
  const out = []
  Object.keys(scenarios).forEach((scenario) => {
    const scopeData = {
      key: scenario,
      name: scenarios[scenario],
    }
    Object.keys(variables).forEach((variable) => {
      scopeData[variables[variable]] = util.round(
        data[units][scenario][variable]
      )
    })
    scopeData["total"] = `${util.round(
      data[units][scenario]["C2Scrap"] +
      data[units][scenario]["C2Buildings"] 
        //data[units][scenario]["C2Forest"]
    )}`
    out.push(scopeData)
  })
  return out
}

function getSubstitution(data, units) {
  const scenarios = { scenario_1: "S1", scenario_2: "S2", scenario_3: "S3" }

  const variables = {
    "MT Production": `Manufacturing emissions of all materials used in the timber building`,
    "MT Transport": `Transport emissions of all materials used in the timber building`,
    "SC Production": `Manufacturing emissions of all materials used in the conventional building`,
    "SC Transport": `Transport emissions of all materials used in the conventional building`,
  }

  const out = []

  Object.keys(scenarios).forEach((scenario) => {
    const scopeData = {
      key: scenario,
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
        //data[units][scenario]["C2Forest"] +
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
  datasetName: PropTypes.string,
}

export default Dashboard