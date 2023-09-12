import React, { useState } from "react"
import PropTypes from "prop-types"
import DoughnutChart from "../DoughnutChart"
import RadialBChart from "../RadialChart"
import NumberChart from "../NumberChart"
import GroupBarChart from "../GroupBarChart"
import StackedBarChart from "../StackedBarChart"
import Assumptions from "../Assumptions"
import { Grid, Paper, Stack, Typography, Switch } from "@mui/material"
import * as util from "../../api/util"
import Image from "next/image"

const colorsThreeS = ["#005B36BF", "#BE8F02", "#FFD966"]

const colorsSink = ["#008000"]
const colorsStorage = ["#462255", "#B4C6E6", "#EEE6CF"]
const colorsSubsctitution = ["#FFD966", "#FFC000"]

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

  return (
    data && <>{JSON.stringify(data)} </>
  )
}



Dashboard.propTypes = {
  data: PropTypes.object,
  version: PropTypes.string,
  dataset: PropTypes.array,
}

export default Dashboard
