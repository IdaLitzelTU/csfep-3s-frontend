import * as util from "../../api/util"

import { Grid, Paper, Stack } from "@mui/material"
import React, { useState } from "react"

import DoughnutChart from "../charts/DoughnutChart"
import GroupBarChart from "../charts/GroupBarChart"
import Image from "next/image"
import PropTypes from "prop-types"
import RadialBChart from "../charts/RadialChart"
import StackedBarChart from "../charts/StackedBarChart"
import SimpleTable from "../charts/SimpleTableChart"
import DashboardHeader from "../dashboard/DashboardHeader"
import { useRouter } from "next/router"

const colorsThreeS = ["#005B36BF", "#BE8F02", "#FFD966"]

const colorsSink = ["#005B36BF"]
const colorsStorage = ["#7B3F00", "#B87333", "#D27D2D"]
const colorsSubsctitution = ["#FFC000", "#FFD966"]

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

const Dashboard = ({ data, version, datasetName }) => {
  const [units, setUnits] = useState("tC")
  const router = useRouter()
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
            <SimpleTable data={getCommon(data, units)} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Image
            alt="forest"
            src="/forest.svg"
            width={1}
            height={1}
            style={{
              paddingTop: "45px",
              objectFit: "contain",
              width: "100%",
              position: "relative",
              height: "unset",
              opacity: "75%",
              marginBottom: "-2vh",
            }}
          />
        </Grid>
      </Grid>
    )
  )
}

function getCommonValues(data, units) {
  const scenarios = {
    scenario_1: "S1",
    scenario_2: "S2",
    scenario_3: "S3",
  }

  const out = Object.keys(scenarios).map((scenario) => {
    const accumulated = data[units][scenario]["c_accumulated"]
    const harvested = data[units][scenario]["c_harvested"]
    const numberOfBuildings = data[units][scenario]["number_of_buildings"]
    const buildingArea = data[units][scenario]["building_area"]

    return [
      scenarios[scenario],
      util.round(accumulated),
      util.round(harvested),
      util.round(numberOfBuildings),
      util.round(buildingArea),
    ]
  })

  out.unshift([
    "",
    `Carbon accumulated after regrow time[${units}]`,
    `Harvested from forest [${units}]`,
    "Number of buildings",
    "Total area [m2]",
  ])

  return out
}

function getCommon(data, units) {
  const scenarios = {
    scenario_1: "S1",
    scenario_2: "S2",
    scenario_3: "S3",
  }

  const out = Object.keys(scenarios).map((scenario) => {
    const cRecoveredPlant = data[units][scenario]["c_recovered_plant"]
    const cRecovered = data[units][scenario]["c_recovered"]
    const yearsToRegrowForest = data[units][scenario]["years_to_regrow_forest"]
    const yearsToRegrowPlantForest = data[units][scenario]["years_to_regrow_plant_forest"]

    return [
      scenarios[scenario],
      util.round(cRecoveredPlant),
      util.round(cRecovered),
      util.round(yearsToRegrowPlantForest),
      util.round(yearsToRegrowForest),
    ]
  })

  out.unshift([
    "Scenario in building lifespann",
    `Carbon recovered in planted area [${units}]`,
    `Carbon recovered in harvested area  [${units}]`,
    "Time to replenish carbon in planted area  [years]",
    "Time to replenish carbon in harvested area  [years]",
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
      value: util.round(data[units][scenario]["c_recovered"]),
    })
  })

  return out
}

function getStorage(data, units) {
  const scenarios = { scenario_1: "S1", scenario_2: "S2", scenario_3: "S3" }

  const variables = {
    c_in_building: `Buildings`,
    c_lost: `Scrap wood`,
  }

  const out = []

  Object.keys(scenarios).forEach((scenario) => {
    const scopeData = {
      key: scenario,
      name: scenarios[scenario],
    }
    Object.keys(variables).forEach((variable) => {
      scopeData[variables[variable]] = util.round(
        data[units][scenario][variable] || 0
      )
    })
    scopeData["total"] = util.round(
      data[units][scenario]["c_lost"] +
        data[units][scenario]["c_in_building"]
    )
    out.push(scopeData)
  })

  return out
}

function getSubstitution(data, units) {
  const scenarios = { scenario_1: "S1", scenario_2: "S2", scenario_3: "S3" }

  const variables = {
    timber_manufacturing: `Manufacturing emissions of all materials used in the timber building`,
    timber_transporting: `Transport emissions of all materials used in the timber building`,
    conventional_manufacturing: `Manufacturing emissions of all materials used in the conventional building`,
    conventional_transporting: `Transport emissions of all materials used in the conventional building`,
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
    scopeData["totalMT"] = util.round(
      data[units][scenario]["timber_manufacturing"] +
        data[units][scenario]["timber_transporting"]
    )
    scopeData["totalSC"] = util.round(
      data[units][scenario]["conventional_manufacturing"] +
        data[units][scenario]["conventional_transporting"]
    )
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

  const sink = getSink(data, units)
  const storage = getStorage(data, units)
  const substitution = getSubstitution(data, units)

  Object.keys(scenarios).forEach((scenario) => {
    // formula is Sink + Substitution

    const scopedSink = sink.find((e) => e.key == scenario)
    const scopedStorage = storage.find((e) => e.key == scenario)
    const scopedSubstitution = substitution.find((e) => e.key == scenario)
    const total = util.round(
      scopedSink.value + scopedSubstitution.totalSC - scopedSubstitution.totalMT
    )

    out.push({
      tooltip: `${total} ${units}`,
      title: scenarios[scenario],
      data: [
        { name: "Sink", value: scopedSink.value },
        { name: "Storage", value: scopedStorage.total },
        {
          name: "Substitution",
          value: scopedSubstitution.totalSC - scopedSubstitution.totalMT,
        },
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
