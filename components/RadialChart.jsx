import React from "react"
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Grid, Typography, Stack } from "@mui/material"
import PropTypes from "prop-types"
import useDim from "../hooks/useDim"
import Image from "next/image"

const RadialBChart = ({ data, colors, units }) => {
  const { ref, width } = useDim()
  return (
    <Grid
      container
      columns={3}
      style={{ textAlign: "center", height: "100%" }}
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid item xs={3}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Gotham Medium", paddingBottom: "15px" }}
          gutterBottom
        >
          <span style={{ color: "green" }}>S</span>INK
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
        style={{ textAlign: "right", paddingBottom: "15px" }}
        ref={ref}
      >
        <Stack>
          <Typography variant="h6" fontFamily={"Gotham Book"}>
            {data[1].name}
          </Typography>
          <Typography
            variant="h4"
            color={colors[0]}
            fontFamily={"Gotham Medium"}
          >
            {data[1].value}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <ResponsiveContainer width={"100%"} height={150}>
          <RadialBarChart
            cx="50%"
            cy={130}
            startAngle={180}
            endAngle={0}
            innerRadius={Math.min((130 * 0.8) / 2, width / 4)}
            outerRadius={Math.min(130 * 0.8, width / 2)}
            barSize={Math.max(width * 0.09, 10)}
            data={data}
          >
            <Tooltip labelFormatter={() => <></>} formatter={format} />
            <RadialBar
              legendType="none"
              background
              dataKey="value"
              fill={colors[0]}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="h6"
          fontFamily={"Gotham Medium"}
          style={{ lineHeight: 1.4 }}
        >
          {`Forest carbon sink recovered after timber harvest (${units})`}
        </Typography>
      </Grid>
    </Grid>
  )
}

RadialBChart.propTypes = {
  data: PropTypes.array,
  colors: PropTypes.array,
  units: PropTypes.string,
}

export default RadialBChart

const format = (value, name, props) => {
  const { payload } = props
  const { tooltip } = payload
  return [value, tooltip]
}
